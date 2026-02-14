"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecipes } from "@/context/recipe-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TablePagination() {
  const { filters, setFilters, totalPages, totalCount } = useRecipes();

  const page = filters.page;
  const limit = filters.limit;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm hidden md:block">
        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> –{" "}
        <span className="font-medium">
          {Math.min(page * limit, totalCount)}
        </span>{" "}
        of <span className="font-medium">{totalCount}</span> results
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="items-center space-x-2 hidden md:flex">
          <p className="text-sm font-medium">Results per page</p>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setFilters((prev) => ({
                ...prev,
                page: 1, // reset page when limit changes
                limit: Number(value),
              }));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[12, 24, 48, 72].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  className="cursor-pointer"
                  value={String(pageSize)}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex cursor-pointer"
            onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex cursor-pointer"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                page: totalPages,
              }))
            }
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
