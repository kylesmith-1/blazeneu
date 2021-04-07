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
alias CompanyTest.Companies.Company
alias CompanyTest.Entries.Entry
alias CompanyTest.Comments.Comment

defmodule Inject do

  def hash(pass) do
    Argon2.hash_pwd_salt("pass")
  end
end

alice = Repo.insert!(%User{name: "alice", email: "alice99999999@gmail.com", password_hash: "123321"})
bob = Repo.insert!(%User{name: "bob", email: "bob99999999@gmail.com", admin: true, password_hash: "asdfgh"})

apple=Repo.insert!(%Company{name: "Apple", location: "Idk, California or Something"})

trustmap=Repo.insert!(%Company{name: "Trustmap", location: "Remote"})

tjx=Repo.insert!(%Company{name: "TJX", location: "marlborough"})

appleTestReport = Repo.insert!(%Entry{drug_test: false, additional_notes: "did not have to pee in a cup", user_id: 1, company_id: 1})

appleComment = Repo.insert!(%Comment{body: "does anyone know what this company does?", company_id: 1, user_id: 1})
