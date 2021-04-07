defmodule CompanyTestWeb.CompanyView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.CompanyView
  alias CompanyTest.Repo

  def render("index.json", %{companies: companies}) do
    %{data: render_many(companies, CompanyView, "company.json")}
  end

  def render("show.json", %{company: company}) do
    %{data: render_one(company, CompanyView, "company.json")}
  end

  def render("company.json", %{company: company}) do

    company = company


    %{id: company.id,
      name: company.name,
      location: company.location}
  end
end
