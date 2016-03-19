package main

// This file provides a logging system. It writes logs to a Windows user app logging directory.
// It also provides an HTTP handler for accessing those logs.

import (
	"fmt"
	"net"
	"net/http"
	"syscall"

	// "github.com/glycerine/rbuf"
	"os"

	"github.com/Wessie/appdirs"
	logging "github.com/op/go-logging"
)

// For messages written to backend we want to add some additional
// information to the output, including the used log level and the name of
// the function.
var format = logging.MustStringFormatter(
	`%{time:15:04:05.000} %{message}`, // %{shortfunc} %{level:.1s}
)

var log = logging.MustGetLogger("stardew.rocks")

var localAddr net.Listener

var (
	kernel32         = syscall.MustLoadDLL("kernel32.dll")
	procSetStdHandle = kernel32.MustFindProc("SetStdHandle")
)

func SetStdHandle(stdhandle int32, handle syscall.Handle) error {
	r0, _, e1 := syscall.Syscall(procSetStdHandle.Addr(), 2, uintptr(stdhandle), uintptr(handle), 0)
	if r0 == 0 {
		if e1 != 0 {
			return error(e1)
		}
		return syscall.EINVAL
	}
	return nil
}

func init() {
	dir := appdirs.UserLogDir("stardew.rocks", "nictuku", "", false)
	if err := os.MkdirAll(dir, 0600); err != nil && !os.IsExist(err) {
		panic(err)
	}
	logPath := dir + `\` + "log.txt" // path.Join doesn't do the right thing :-(
	f, err := os.OpenFile(logPath, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0600)
	if err != nil {
		panic(err)
	}

	// Redirect Stderr to this file.
	if err = SetStdHandle(syscall.STD_ERROR_HANDLE, syscall.Handle(f.Fd())); err != nil {
		panic(err)
	}
	if err = SetStdHandle(syscall.STD_OUTPUT_HANDLE, syscall.Handle(f.Fd())); err != nil {
		panic(err)
	}

	backend := logging.NewLogBackend(f, "", 0)

	formatted := logging.AddModuleLevel(logging.NewBackendFormatter(backend, format))
	formatted.SetLevel(logging.INFO, "")

	// Set the backends to be used and the default level.
	logging.SetBackend(formatted)

	log.Info("Starting stardew.rocks")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// This is going to write header twice.. oh well.
		fmt.Fprintf(w, "Showing log file %v\n", logPath)
		http.ServeFile(w, r, logPath)
	})
	localAddr, err = net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal("Listen failure:", err)
	}

}
