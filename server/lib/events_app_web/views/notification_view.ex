defmodule CompanyTestWeb.NotificationView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.NotificationView

  def render("index.json", %{notifications: notifications}) do
    %{data: render_many(notifications, NotificationView, "notification.json")}
  end

  def render("show.json", %{notification: notification}) do
    %{data: render_one(notification, NotificationView, "notification.json")}
  end

  def render("notification.json", %{notification: notification}) do
    %{id: notification.id,
    user_id: notification.user_id,
    company_id: notification.company_id}
  end
end
