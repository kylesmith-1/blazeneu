defmodule CompanyTestWeb.PageController do
  use CompanyTestWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
