"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { listings } from "@/data/listings";
import { Listing } from "@/types";
import { fmt } from "@/lib/formatters";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const columnHelper = createColumnHelper<Listing>();

const columns = [
  columnHelper.accessor("n", {
    id: "n",
    header: "#",
    cell: (info) => (
      <span className="text-[var(--text-dim)]">{info.getValue()}</span>
    ),
    size: 40,
  }),
  columnHelper.accessor("addr", {
    id: "addr",
    header: "Address",
    cell: (info) => (
      <span className="font-medium">{info.getValue()}</span>
    ),
    size: 200,
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: "Price",
    cell: (info) => (
      <span className="font-heading font-medium text-[var(--navy)] text-[14px] tabular-nums">
        {fmt(info.getValue())}
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "Type",
    cell: (info) => {
      const type = info.getValue();
      return (
        <span
          className={`inline-block px-3 py-1 rounded-md text-[10px] font-semibold tracking-[0.5px] uppercase ${
            type === "House"
              ? "bg-[var(--navy)]/[0.08] text-[var(--navy)]"
              : "bg-[var(--gold)]/15 text-[var(--gold-dark)]"
          }`}
        >
          {type}
        </span>
      );
    },
    size: 80,
  }),
  columnHelper.accessor("beds", {
    id: "beds",
    header: "Beds",
    size: 50,
  }),
  columnHelper.accessor((row) => row.fbath + row.hbath * 0.5, {
    id: "baths",
    header: "Baths",
    cell: (info) => info.getValue(),
    size: 50,
  }),
  columnHelper.accessor("sqft", {
    id: "sqft",
    header: "Sq Ft",
    cell: (info) => {
      const val = info.getValue();
      return <span className="tabular-nums">{val > 0 ? val.toLocaleString() : "N/A"}</span>;
    },
    size: 80,
  }),
  columnHelper.accessor((row) => (row.sqft > 0 ? Math.round(row.price / row.sqft) : 0), {
    id: "psf",
    header: "$/SF",
    cell: (info) => {
      const val = info.getValue();
      return <span className="tabular-nums">{val > 0 ? "$" + val.toLocaleString() : "N/A"}</span>;
    },
    size: 80,
  }),
  columnHelper.accessor("yr", {
    id: "yr",
    header: "Year",
    cell: (info) => {
      const val = info.getValue();
      return val > 0 ? val : "N/A";
    },
    size: 60,
  }),
  columnHelper.accessor("subdiv", {
    id: "subdiv",
    header: "Subdivision",
    cell: (info) => info.getValue() || "—",
    size: 150,
  }),
  columnHelper.accessor("pool", {
    id: "pool",
    header: "Pool",
    cell: (info) => info.getValue() || "—",
    size: 50,
  }),
  columnHelper.accessor("hoa", {
    id: "hoa",
    header: "HOA",
    cell: (info) => {
      const val = info.getValue();
      return <span className="tabular-nums">{val > 0 ? "$" + val.toLocaleString() : "—"}</span>;
    },
    size: 80,
  }),
];

// Column visibility presets by breakpoint
const MOBILE_COLS: VisibilityState = {
  n: false, addr: true, price: true, type: true, beds: true,
  baths: false, sqft: false, psf: false, yr: false, subdiv: false, pool: false, hoa: false,
};
const TABLET_COLS: VisibilityState = {
  n: false, addr: true, price: true, type: true, beds: true,
  baths: true, sqft: true, psf: true, yr: false, subdiv: false, pool: false, hoa: false,
};
const DESKTOP_COLS: VisibilityState = {
  n: true, addr: true, price: true, type: true, beds: true,
  baths: true, sqft: true, psf: true, yr: true, subdiv: true, pool: true, hoa: true,
};

export default function PortfolioTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(DESKTOP_COLS);

  useEffect(() => {
    function updateVisibility() {
      const w = window.innerWidth;
      if (w < 768) setColumnVisibility(MOBILE_COLS);
      else if (w < 1024) setColumnVisibility(TABLET_COLS);
      else setColumnVisibility(DESKTOP_COLS);
    }
    updateVisibility();
    window.addEventListener("resize", updateVisibility);
    return () => window.removeEventListener("resize", updateVisibility);
  }, []);

  const filteredData = useMemo(() => {
    if (typeFilter === "All") return listings;
    return listings.filter((l) => l.type === typeFilter);
  }, [typeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="py-16 md:py-20 bg-[var(--off-white)]" id="portfolio">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="section-label">Complete Data</div>
          <div className="section-title inline-flex items-center gap-3">
            Full Portfolio
            <span className="bg-[var(--navy)] text-white text-[12px] font-body font-medium px-3 py-1 rounded-full tracking-[0.5px] uppercase align-middle">
              {listings.length}
            </span>
          </div>
        </motion.div>

        <RevealOnScroll delay={0.1}>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 items-stretch sm:items-center">
            <div className="flex gap-2">
              {["All", "House", "Condo"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-5 py-3 sm:py-2.5 rounded-md font-body text-[13px] font-medium tracking-[0.5px] uppercase border transition-all flex-1 sm:flex-none ${
                    typeFilter === type
                      ? "bg-[var(--navy)] text-white border-[var(--navy)]"
                      : "bg-white text-[var(--text)] border-[var(--border)] hover:border-[var(--navy)] hover:text-[var(--navy)]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search address, MLS, subdivision..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-white border border-[var(--border)] text-[var(--text)] px-4 py-3 sm:py-2.5 rounded-md font-body text-[13px] outline-none w-full sm:w-[280px] transition-[border-color] focus:border-[var(--navy)] placeholder:text-[var(--text-dim)]"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-[var(--shadow-lg)] -mx-1">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr>
                  {table.getHeaderGroups()[0].headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="text-white/85 font-body text-[10px] uppercase tracking-[1.5px] px-4 py-3.5 text-left cursor-pointer whitespace-nowrap font-medium hover:text-[var(--gold)] transition-colors select-none"
                      style={{
                        width: header.getSize(),
                        background: "linear-gradient(90deg, var(--navy-deep), var(--navy))",
                      }}
                    >
                      <span className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="text-[var(--gold)]/60">
                          {{
                            asc: " ▲",
                            desc: " ▼",
                          }[header.column.getIsSorted() as string] ?? ""}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.original.mls}
                    className="even:bg-[var(--off-white)]/50 hover:bg-[var(--gold-pale)] transition-colors duration-150 border-l-2 border-l-transparent hover:border-l-[var(--gold)]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-b border-[var(--border-light)] whitespace-nowrap text-[13px]"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-[12px] text-[var(--text-dim)] font-medium">
            Showing {table.getRowModel().rows.length} of {listings.length} listings
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
