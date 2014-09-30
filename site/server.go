package site

import (
	"github.com/y-a-r-g/dongo"
	"os"
	"net/http"
)

func StartServer() {
	dongo.ServeStatic("/static/", "static")

	dongo.ServeTemplateView("home", "/", "templates/index.html", ShowStaticPage)
	dongo.ServeTemplateView("home", "/robots.txt", "templates/robots.txt", ShowStaticPage)
	dongo.ServeTemplateView("projects_hal", "/projects/hal/", "templates/projects/hal/index.html", ShowStaticPage)

	var port string = os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}
