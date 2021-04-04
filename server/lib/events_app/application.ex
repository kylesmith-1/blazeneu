defmodule CompanyTest.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      CompanyTest.Repo,
      # Start the Telemetry supervisor
      CompanyTestWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: CompanyTest.PubSub},
      # Start the Endpoint (http/https)
      CompanyTestWeb.Endpoint
      # Start a worker by calling: CompanyTest.Worker.start_link(arg)
      # {CompanyTest.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: CompanyTest.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    CompanyTestWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
