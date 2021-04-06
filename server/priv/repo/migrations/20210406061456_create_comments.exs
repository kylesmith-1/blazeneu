defmodule CompanyTest.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :text, null: false

      add :company_id, references(:companies, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false
      timestamps()
    end

    create index(:comments, [:company_id])
    create index(:comments, [:user_id])
  end
end
