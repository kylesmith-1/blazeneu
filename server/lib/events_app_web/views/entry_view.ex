defmodule CompanyTestWeb.EntryView do
  use CompanyTestWeb, :view
  alias CompanyTestWeb.EntryView

  def render("index.json", %{entries: entries}) do
    %{data: render_many(entries, EntryView, "entry.json")}
  end

  def render("show.json", %{entry: entry}) do
    %{data: render_one(entry, EntryView, "entry.json")}
  end

  def render("entry.json", %{entry: entry}) do
    %{id: entry.id,
      drug_test: entry.drug_test,
      continuous_drug_testing: entry.continuous_drug_testing,
      coop_cycle: entry.coop_cycle,
      additional_notes: entry.additional_notes,
      verified: entry.verified}
  end
end
