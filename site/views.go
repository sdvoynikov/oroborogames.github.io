package site

import (
	"net/http"
	"github.com/flosch/pongo2"
)

var defaultContext = pongo2.Context{
	"_":func(text string) string {
		return text
	},
}

func ViewIndex(request *http.Request) pongo2.Context {
	return defaultContext
}

func ViewProjectHAL(request *http.Request) pongo2.Context {
	return defaultContext
}
