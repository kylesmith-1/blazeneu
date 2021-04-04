defmodule CompanyTest.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :event_title, :string, null: false
      add :date, :string, null: false
      add :body, :text, null: false

      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
