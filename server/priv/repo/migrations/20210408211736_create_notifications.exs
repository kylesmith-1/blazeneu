defmodule EventsApp.Repo.Migrations.CreateNotifications do
  use Ecto.Migration

  def change do
    create table(:notifications) do
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :company_id, references(:companies, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:notifications, [:user_id])
    create index(:notifications, [:company_id])
  end
end
