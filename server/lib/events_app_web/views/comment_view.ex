defmodule CompanyTestWeb.CommentView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.CommentView
  alias CompanyTestWeb.UserView
  alias CompanyTest.Repo

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    comment = comment
    |> Repo.preload(:event)
    |> Repo.preload(:user)

    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    user = if Ecto.assoc_loaded?(comment.user) do
      render_one(comment.user, UserView, "user.json")
    else
      nil
    end
    %{
      id: comment.id,
      body: comment.body,
      company_id: comment.company_id,
      user: comment.user_id
    }
  end
end
