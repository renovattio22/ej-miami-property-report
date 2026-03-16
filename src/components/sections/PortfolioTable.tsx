"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { listings } from "@/data/listings";
import { Listing } from "@/types";
import { fmt } from "@/lib/formatters";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const columnHelper = createColumnHelper<Listing>();

const columns = [
  columnHelper.accessor("n", {
    header: "#",
    cell: (info) => info.getValue(),
    size: 40,
  }),
  columnHelper.accessor("addr", {
    header: "Address",
    cell: (info) => (
      <span className="font-medium">{info.getValue()}</span>
    ),
    size: 200,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <span className="font-heading font-medium text-[var(--navy)] text-[14px]">
        {fmt(info.getValue())}
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor("type", {
    header: "Type",
    cell: (info) => {
      const type = info.getValue();
      return (
        <span
          className={`inline-block px-3 py-0.5 rounded-sm text-[11px] font-semibold tracking-[0.5px] uppercase ${
            type === "House"
              ? "bg-[rgba(25,46,90,0.1)] text-[var(--navy)]"
              : "bg-[rgba(184,146,62,0.15)] text-[#8b6914]"
          }`}
        >
          {type}
        </span>
      );
    },
    size: 80,
  }),
  columnHelper.accessor("beds", {
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
    header: "Sq Ft",
    cell: (info) => {
      const val = info.getValue();
      return val > 0 ? val.toLocaleString() : "N/A";
    },
    size: 80,
  }),
  columnHelper.accessor((row) => (row.sqft > 0 ? Math.round(row.price / row.sqft) : 0), {
    id: "psf",
    header: "$/SF",
    cell: (info) => {
      const val = info.getValue();
      return val > 0 ? "$" + val.toLocaleString() : "N/A";
    },
    size: 80,
  }),
  columnHelper.accessor("yr", {
    header: "Year",
    cell: (info) => {
      const val = info.getValue();
      return val > 0 ? val : "N/A";
    },
    size: 60,
  }),
  columnHelper.accessor("subdiv", {
    header: "Subdivision",
    cell: (info) => info.getValue() || "—",
    size: 150,
  }),
  columnHelper.accessor("pool", {
    header: "Pool",
    cell: (info) => info.getValue() || "—",
    size: 50,
  }),
  columnHelper.accessor("hoa", {
    header: "HOA",
    cell: (info) => {
      const val = info.getValue();
      return val > 0 ? "$" + val.toLocaleString() : "—";
    },
    size: 80,
  }),
];

export default function PortfolioTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filteredData = useMemo(() => {
    if (typeFilter === "All") return listings;
    return listings.filter((l) => l.type === typeFilter);
  }, [typeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="py-10 px-5 md:px-10 bg-[var(--off-white)]" id="portfolio">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="section-label">Complete Data</div>
        <div className="section-title">Full Portfolio</div>
      </motion.div>

      <RevealOnScroll delay={0.2}>
        {/* Filters */}
        <div className="flex flex-wrap gap-3 my-6 items-center">
          {["All", "House", "Condo"].map((type) => (
            <motion.button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-5 py-2 rounded-sm font-body text-[14px] font-medium tracking-[0.5px] uppercase border transition-all ${
                typeFilter === type
                  ? "bg-[var(--navy)] text-white border-[var(--navy)]"
                  : "bg-white text-[var(--text)] border-[var(--mid-gray)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)]"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {type}
            </motion.button>
          ))}

          <input
            type="text"
            placeholder="Search address, MLS, subdivision..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-white border border-[var(--mid-gray)] text-[var(--text)] px-4 py-2 rounded-sm font-body text-[14px] outline-none w-[260px] transition-[border-color] focus:border-[var(--navy)] placeholder:text-[var(--text-dim)]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border border-[var(--border)] rounded-sm shadow-[var(--shadow)]">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="bg-[var(--navy)] text-white/90 font-body text-[11px] uppercase tracking-[1.5px] px-4 py-3.5 text-left cursor-pointer whitespace-nowrap sticky top-0 font-medium hover:text-[var(--gold)] transition-colors select-none"
                    style={{ width: header.getSize() }}
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " ▲",
                        desc: " ▼",
                      }[header.column.getIsSorted() as string] ?? ""}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.original.mls}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="even:bg-[var(--off-white)] hover:bg-[var(--gold-pale)] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-b border-[var(--border-light)] whitespace-nowrap text-[13px]"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-[12px] text-[var(--text-dim)]">
          Showing {table.getRowModel().rows.length} of {listings.length} listings
        </div>
      </RevealOnScroll>
    </section>
  );
}
