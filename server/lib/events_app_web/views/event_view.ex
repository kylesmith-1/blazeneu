defmodule CompanyTestWeb.EventView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.EventView
  alias CompanyTestWeb.UserView
  alias CompanyTestWeb.InviteView
  alias CompanyTestWeb.CommentView
  alias CompanyTest.Repo


  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do

    event = event
    |> Repo.preload(:comments)
    |> Repo.preload(:invites)
    |> Repo.preload(:user)

    user = if Ecto.assoc_loaded?(event.user) do
      render_one(event.user, UserView, "user.json")
    else
      nil
    end

    eventInvites = event.invites
    |> Repo.preload(:event)
    |> Repo.preload(:user)

    invites = if Ecto.assoc_loaded?(event.invites) do
      render_many(eventInvites, InviteView, "invite.json")
    else
      nil
    end

    eventComments = event.comments
    |> Repo.preload(:event)
    |> Repo.preload(:user)

    comments = if Ecto.assoc_loaded?(event.comments) do
      render_many(eventComments, CommentView, "comment.json")
    else
      nil
    end

    %{
      id: event.id,
      event_title: event.event_title,
      date: event.date,
      body: event.body,
      user: user,
      invites: invites,
      comments: comments
    }
  end
end
