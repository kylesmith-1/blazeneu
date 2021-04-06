defmodule CompanyTest.EntriesTest do
  use CompanyTest.DataCase

  alias CompanyTest.Entries

  describe "entries" do
    alias CompanyTest.Entries.Entry

    @valid_attrs %{additional_notes: "some additional_notes", continuous_drug_testing: true, drug_test: true, verified: true}
    @update_attrs %{additional_notes: "some updated additional_notes", continuous_drug_testing: false, drug_test: false, verified: false}
    @invalid_attrs %{additional_notes: nil, continuous_drug_testing: nil, drug_test: nil, verified: nil}

    def entry_fixture(attrs \\ %{}) do
      {:ok, entry} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Entries.create_entry()

      entry
    end

    test "list_entries/0 returns all entries" do
      entry = entry_fixture()
      assert Entries.list_entries() == [entry]
    end

    test "get_entry!/1 returns the entry with given id" do
      entry = entry_fixture()
      assert Entries.get_entry!(entry.id) == entry
    end

    test "create_entry/1 with valid data creates a entry" do
      assert {:ok, %Entry{} = entry} = Entries.create_entry(@valid_attrs)
      assert entry.additional_notes == "some additional_notes"
      assert entry.continuous_drug_testing == true
      assert entry.drug_test == true
      assert entry.verified == true
    end

    test "create_entry/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Entries.create_entry(@invalid_attrs)
    end

    test "update_entry/2 with valid data updates the entry" do
      entry = entry_fixture()
      assert {:ok, %Entry{} = entry} = Entries.update_entry(entry, @update_attrs)
      assert entry.additional_notes == "some updated additional_notes"
      assert entry.continuous_drug_testing == false
      assert entry.drug_test == false
      assert entry.verified == false
    end

    test "update_entry/2 with invalid data returns error changeset" do
      entry = entry_fixture()
      assert {:error, %Ecto.Changeset{}} = Entries.update_entry(entry, @invalid_attrs)
      assert entry == Entries.get_entry!(entry.id)
    end

    test "delete_entry/1 deletes the entry" do
      entry = entry_fixture()
      assert {:ok, %Entry{}} = Entries.delete_entry(entry)
      assert_raise Ecto.NoResultsError, fn -> Entries.get_entry!(entry.id) end
    end

    test "change_entry/1 returns a entry changeset" do
      entry = entry_fixture()
      assert %Ecto.Changeset{} = Entries.change_entry(entry)
    end
  end
end
