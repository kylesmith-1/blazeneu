defmodule CompanyTest.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :name, :string
      add :admin, :boolean, null: false, default: false
      add :password_hash, :string, null: false

      timestamps()
    end

  end
end
