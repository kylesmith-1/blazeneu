defmodule PhotoBlogWeb.SessionControllerTest do
  use PhotoBlogWeb.ConnCase

  describe "create session" do
    test "returns token when login valid", %{conn: conn} do
      login = %{"name" => "alice", "password" => "test1"}
      conn = post(conn, Routes.session_path(conn, :create), login)
      session = json_response(conn, 201)["session"]
      assert session["name"] == "alice"
      assert String.length(session["token"]) > 10
    end

    test "returns error when login bad", %{conn: conn} do
      login = %{"name" => "alice", "password" => "bad"}
      conn = post(conn, Routes.session_path(conn, :create), login)
      assert json_response(conn, 401)["error"] == "fail"
    end
  end
end
