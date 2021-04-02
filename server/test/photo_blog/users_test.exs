defmodule PhotoBlog.UsersTest do
  use PhotoBlog.DataCase

  alias PhotoBlog.Users

  describe "users" do
    alias PhotoBlog.Users.User

    @valid_attrs %{name: "carol", password: "password1"}
    @update_attrs %{name: "dave", password: "password2"}
    @invalid_attrs %{name: "erin", password: "goat"}

    def norm(%User{} = user) do
      Map.drop(user, [:password])
    end

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      names = Users.list_users() |> Enum.map(&(&1.name))
      assert Enum.member?(names, "carol")
      assert Enum.member?(names, "alice")
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert norm(Users.get_user!(user.id)) == norm(user)
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.name == "carol"
      assert Argon2.check_pass(user, "password1")
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.name == "some updated name"
      assert user.password_hash == "some updated password_hash"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
