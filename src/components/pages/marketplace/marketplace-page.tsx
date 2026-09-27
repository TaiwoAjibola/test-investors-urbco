"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, TrendingUp, DollarSign, Users, Search, Crown, Anchor, Grid, List, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/stores/appStore";
import { formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import Link from "next/link";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | "foundry" | "harbor">("all");
  const [stageFilter, setStageFilter] = useState<"all" | "pre-development" | "post-development">("all");
  const [filters, setFilters] = useState({
    location: "all",
    propertyType: "all",
    status: "all",
  });

  const { properties } = useAppStore();

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrack =
      trackFilter === "all" ||
      property.targetTrack === "both" ||
      property.targetTrack === trackFilter;

    const matchesStage =
      stageFilter === "all" || property.developmentStage === stageFilter;

    const matchesLocation =
      !filters.location || filters.location === "all" || property.location.includes(filters.location);
    const matchesType =
      !filters.propertyType || filters.propertyType === "all" || property.propertyType === filters.propertyType;
    const matchesStatus =
      !filters.status || filters.status === "all" || property.status === filters.status;

    return matchesSearch && matchesTrack && matchesStage && matchesLocation && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investment Marketplace</h1>
          <p className="text-slate-500">Discover Opco Foundry & Opco Harbor real estate opportunities</p>
        </div>

        {/* Track Toggle */}
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-sm">
          <button
            onClick={() => setTrackFilter("all")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              trackFilter === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Tracks
          </button>

          <button
            onClick={() => setTrackFilter("foundry")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              trackFilter === "foundry"
                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-sm"
                : "text-amber-700 hover:text-amber-800"
            }`}
          >
            <Crown className="h-3.5 w-3.5" />
            Opco Foundry ($200M+)
          </button>

          <button
            onClick={() => setTrackFilter("harbor")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              trackFilter === "harbor"
                ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-sm"
                : "text-cyan-700 hover:text-cyan-800"
            }`}
          >
            <Anchor className="h-3.5 w-3.5" />
            Opco Harbor (Retail)
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by property name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3">
              {/* Development Stage Filter */}
              <Select value={stageFilter} onValueChange={(val: any) => setStageFilter(val)}>
                <SelectTrigger className="w-44 bg-slate-50">
                  <SelectValue placeholder="Development Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Development Stages</SelectItem>
                  <SelectItem value="pre-development">Pre-Development</SelectItem>
                  <SelectItem value="post-development">Post-Development</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
                  <SelectItem value="Ibadan">Ibadan</SelectItem>
                </SelectContent>
              </Select>

              {/* Property Type Filter */}
              <Select value={filters.propertyType} onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none h-10 w-10"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none h-10 w-10"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count & Track Summary Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-600">
        <p>
          Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties
          {trackFilter !== "all" && (
            <span> in <strong className="capitalize text-emerald-600">Opco {trackFilter}</strong></span>
          )}
          {stageFilter !== "all" && (
            <span> (<strong className="capitalize text-indigo-600">{stageFilter}</strong> stage)</span>
          )}
        </p>

        {trackFilter === "foundry" && (
          <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium">
            👑 Opco Foundry Track: Mega Assets (&gt;$200M Scale) & Pre/Post Development Deals
          </span>
        )}
        {trackFilter === "harbor" && (
          <span className="text-xs bg-cyan-50 text-cyan-800 border border-cyan-200 px-3 py-1 rounded-full font-medium">
            ⚓ Opco Harbor Track: Accessible Fractional Shares & Automated Wallet Dividends
          </span>
        )}
      </div>

      {/* Properties Grid View */}
      {viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/assets/${property.id}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 h-full border border-slate-200">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Stage & Track Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <Badge
                        className={
                          property.developmentStage === "pre-development"
                            ? "bg-purple-600 text-white font-semibold"
                            : "bg-emerald-600 text-white font-semibold"
                        }
                      >
                        {property.developmentStage === "pre-development" ? "Pre-Development" : "Post-Development"}
                      </Badge>

                      <Badge
                        className={
                          property.targetTrack === "foundry"
                            ? "bg-amber-400 text-black font-bold"
                            : property.targetTrack === "harbor"
                            ? "bg-cyan-400 text-black font-bold"
                            : "bg-slate-200 text-black font-bold"
                        }
                      >
                        {property.targetTrack === "foundry"
                          ? "Foundry"
                          : property.targetTrack === "harbor"
                          ? "Harbor"
                          : "Foundry & Harbor"}
                      </Badge>

                      {property.buyingPaths.some((p) => p.type === "investment") && (
                        <Badge className="bg-indigo-500 text-white font-semibold">
                          Investment
                        </Badge>
                      )}
                      {property.buyingPaths.some((p) => p.type === "ownership") && (
                        <Badge className="bg-teal-600 text-white font-semibold">
                          Ownership
                        </Badge>
                      )}
                    </div>

                    {/* ROI Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md">
                      <span className="text-xs font-bold text-emerald-600">
                        {formatPercentage(property.projectedROI)} ROI
                      </span>
                    </div>

                    {/* Property Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-lg font-bold group-hover:text-amber-300 transition-colors">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-xs text-white/80 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Funding Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-600">Funding Progress</span>
                        <span className="font-semibold text-slate-900">
                          {formatPercentage(property.fundingProgress)}
                        </span>
                      </div>
                      <Progress value={property.fundingProgress} className="h-2" />
                      <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                        <span>{formatCompactNumber(property.propertyValue)} valuation</span>
                        <span>{property.investorsCount} investors</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-t border-slate-100 text-xs">
                      <div>
                        <div className="text-slate-500 mb-0.5">Min Entry Ticket</div>
                        <p className="font-bold text-slate-900">
                          {formatCurrency(property.minimumInvestment || property.costPerFraction)}
                        </p>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-0.5">Rental Yield</div>
                        <p className="font-bold text-emerald-600">
                          {formatPercentage(property.rentalYield)}
                        </p>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-0.5">Capital Growth</div>
                        <p className="font-bold text-purple-600">+{property.capitalAppreciation}%</p>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-0.5">Property Type</div>
                        <p className="font-semibold text-slate-800 capitalize">{property.propertyType}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button variant="premium" className="w-full mt-3 font-semibold">
                      View Asset Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/assets/${property.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-slate-200">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                          <Badge className="bg-purple-600 text-white text-xs">
                            {property.developmentStage === "pre-development" ? "Pre-Dev" : "Post-Dev"}
                          </Badge>
                          <Badge className="bg-amber-400 text-black font-bold text-xs">
                            {property.targetTrack === "foundry" ? "Foundry" : property.targetTrack === "harbor" ? "Harbor" : "Both"}
                          </Badge>
                          {property.buyingPaths.some((p) => p.type === "investment") && (
                            <Badge className="bg-indigo-500 text-white text-xs font-semibold">Investment</Badge>
                          )}
                          {property.buyingPaths.some((p) => p.type === "ownership") && (
                            <Badge className="bg-teal-600 text-white text-xs font-semibold">Ownership</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {property.name}
                            </h3>
                            <div className="flex items-center text-xs text-slate-500 mt-1">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              {property.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-extrabold text-emerald-600">
                              {formatPercentage(property.projectedROI)}
                            </div>
                            <div className="text-xs text-slate-500 font-medium">Projected ROI</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-xs">
                          <div>
                            <div className="text-slate-500">Min Ticket</div>
                            <div className="font-bold text-slate-900">
                              {formatCurrency(property.minimumInvestment || property.costPerFraction)}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Rental Yield</div>
                            <div className="font-bold text-emerald-600">
                              {formatPercentage(property.rentalYield)}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Funding</div>
                            <div className="font-bold text-slate-900">
                              {formatPercentage(property.fundingProgress)}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Valuation</div>
                            <div className="font-bold text-slate-900">
                              {formatCompactNumber(property.propertyValue)}
                            </div>
                          </div>
                        </div>

                        <Progress value={property.fundingProgress} className="mb-4 h-2" />

                        <Button variant="premium" className="w-full md:w-auto">
                          View Investment Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties matched your search</h3>
          <p className="text-slate-500 text-sm">Try clearing your filters or switching tracks</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setTrackFilter("all");
              setStageFilter("all");
              setSearchQuery("");
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
