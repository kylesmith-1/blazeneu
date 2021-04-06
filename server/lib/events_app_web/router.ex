defmodule CompanyTestWeb.Router do
  use CompanyTestWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CompanyTestWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api/v1", CompanyTestWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/events", EventController, except: [:new]
    resources "/comments", CommentController, except: [:new, :edit]
    resources "/invites", InviteController, except: [:new, :edit]
    resources "/session", SessionController, only: [:create]
    resources "/companies", CompanyController, except: [:new, :edit]
    resources "/entries", EntryController, except: [:new, :edit]
  end


  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: CompanyTestWeb.Telemetry
    end
  end
end
