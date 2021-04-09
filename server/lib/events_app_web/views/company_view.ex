defmodule CompanyTestWeb.CompanyView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.CompanyView
  alias CompanyTestWeb.EntryView
  alias CompanyTestWeb.NotificationView
  alias CompanyTest.Repo

  def render("index.json", %{companies: companies}) do
    %{data: render_many(companies, CompanyView, "company.json")}
  end

  def render("show.json", %{company: company}) do
    %{data: render_one(company, CompanyView, "company.json")}
  end

  def render("company.json", %{company: company}) do
    company = company
    |> Repo.preload(:entries)
    |> Repo.preload(:notifications)

    companyEntries = company.entries
    |> Repo.preload(:company)
    |> Repo.preload(:user)

    entries = if Ecto.assoc_loaded?(company.entries) do
      render_many(companyEntries, EntryView, "entry.json")
    else
      nil
    end

    companyNotifications = company.notifications
    |> Repo.preload(:company)
    |> Repo.preload(:user)

    notifications = if Ecto.assoc_loaded?(company.notifications) do
      render_many(companyNotifications, NotificationView, "notification.json")
    else
      nil
    end

    %{id: company.id,
      name: company.name,
      location: company.location,
      entries: entries,
      notifications: notifications}
  end
end
