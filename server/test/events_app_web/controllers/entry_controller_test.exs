defmodule CompanyTestWeb.EntryControllerTest do
  use CompanyTestWeb.ConnCase

  alias CompanyTest.Entries
  alias CompanyTest.Entries.Entry

  @create_attrs %{
    additional_notes: "some additional_notes",
    continuous_drug_testing: true,
    drug_test: true,
    verified: true
  }
  @update_attrs %{
    additional_notes: "some updated additional_notes",
    continuous_drug_testing: false,
    drug_test: false,
    verified: false
  }
  @invalid_attrs %{additional_notes: nil, continuous_drug_testing: nil, drug_test: nil, verified: nil}

  def fixture(:entry) do
    {:ok, entry} = Entries.create_entry(@create_attrs)
    entry
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all entries", %{conn: conn} do
      conn = get(conn, Routes.entry_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create entry" do
    test "renders entry when data is valid", %{conn: conn} do
      conn = post(conn, Routes.entry_path(conn, :create), entry: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.entry_path(conn, :show, id))

      assert %{
               "id" => id,
               "additional_notes" => "some additional_notes",
               "continuous_drug_testing" => true,
               "drug_test" => true,
               "verified" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.entry_path(conn, :create), entry: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update entry" do
    setup [:create_entry]

    test "renders entry when data is valid", %{conn: conn, entry: %Entry{id: id} = entry} do
      conn = put(conn, Routes.entry_path(conn, :update, entry), entry: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.entry_path(conn, :show, id))

      assert %{
               "id" => id,
               "additional_notes" => "some updated additional_notes",
               "continuous_drug_testing" => false,
               "drug_test" => false,
               "verified" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, entry: entry} do
      conn = put(conn, Routes.entry_path(conn, :update, entry), entry: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete entry" do
    setup [:create_entry]

    test "deletes chosen entry", %{conn: conn, entry: entry} do
      conn = delete(conn, Routes.entry_path(conn, :delete, entry))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.entry_path(conn, :show, entry))
      end
    end
  end

  defp create_entry(_) do
    entry = fixture(:entry)
    %{entry: entry}
  end
end
