# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     CompanyTest.Repo.insert!(%CompanyTest.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias CompanyTest.Repo
alias CompanyTest.Users.User

defmodule Inject do

  def hash(pass) do
    Argon2.hash_pwd_salt("pass")
  end
end

alice = Repo.insert!(%User{name: "alice", email: "alice99999999@gmail.com", password_hash: "123321"})
bob = Repo.insert!(%User{name: "bob", email: "bob99999999@gmail.com", password_hash: "asdfgh"})
