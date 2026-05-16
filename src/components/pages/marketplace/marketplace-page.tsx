"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, TrendingUp, DollarSign, Users, Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { properties } from "@/data/mockData";
import { formatCurrency, formatPercentage, formatCompactNumber } from "@/lib/utils";
import Link from "next/link";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    status: "",
    minROI: "",
    maxROI: "",
  });

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !filters.location || filters.location === "all" || property.location.includes(filters.location);
    const matchesType = !filters.propertyType || filters.propertyType === "all" || property.propertyType === filters.propertyType;
    const matchesStatus = !filters.status || filters.status === "all" || property.status === filters.status;
    return matchesSearch && matchesLocation && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Investment Marketplace</h1>
          <p className="text-slate-500">Discover premium real estate investment opportunities</p>
        </div>
      </div>

      {/* Filters Bar */}
      <Card>
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

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                <SelectTrigger className="w-40">
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

              <Select value={filters.propertyType} onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="funding">Funding</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filteredProperties.length}</span> properties
        </p>
      </div>

      {/* Properties Grid/List */}
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
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant={property.status === "open" ? "success" : property.status === "funding" ? "warning" : "default"}>
                        {property.status === "open" ? "Open for Investment" : property.status === "funding" ? "Funding" : "Closed"}
                      </Badge>
                    </div>

                    {/* ROI Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-emerald-600">{formatPercentage(property.projectedROI)} ROI</span>
                    </div>

                    {/* Property Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{property.name}</h3>
                      <div className="flex items-center text-sm text-white/80">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    {/* Funding Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Funding Progress</span>
                        <span className="font-semibold text-slate-900">{formatPercentage(property.fundingProgress)}</span>
                      </div>
                      <Progress value={property.fundingProgress} className="h-2.5" />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>{formatCompactNumber(property.fractionsSold * property.costPerFraction)} raised</span>
                        <span>{property.fractionsSold}/{property.totalFractions} fractions</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                      <div>
                        <div className="flex items-center text-slate-500 text-xs mb-1">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Min Investment
                        </div>
                        <p className="font-semibold text-slate-900">{formatCurrency(property.costPerFraction)}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-slate-500 text-xs mb-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Rental Yield
                        </div>
                        <p className="font-semibold text-emerald-600">{formatPercentage(property.rentalYield)}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-slate-500 text-xs mb-1">
                          <Users className="h-3 w-3 mr-1" />
                          Investors
                        </div>
                        <p className="font-semibold text-slate-900">{property.investorsCount}</p>
                      </div>
                      <div>
                        <div className="flex items-center text-slate-500 text-xs mb-1">
                          <Building2 className="h-3 w-3 mr-1" />
                          Type
                        </div>
                        <p className="font-semibold text-slate-900 capitalize">{property.propertyType}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button variant="premium" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/assets/${property.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant={property.status === "open" ? "success" : "warning"}>
                            {property.status === "open" ? "Open" : "Funding"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{property.name}</h3>
                            <div className="flex items-center text-slate-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {property.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-600">{formatPercentage(property.projectedROI)}</div>
                            <div className="text-xs text-slate-500">Projected ROI</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-slate-500">Min Investment</div>
                            <div className="font-semibold text-slate-900">{formatCurrency(property.costPerFraction)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Rental Yield</div>
                            <div className="font-semibold text-emerald-600">{formatPercentage(property.rentalYield)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Funding</div>
                            <div className="font-semibold text-slate-900">{formatPercentage(property.fundingProgress)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Investors</div>
                            <div className="font-semibold text-slate-900">{property.investorsCount}</div>
                          </div>
                        </div>

                        <Progress value={property.fundingProgress} className="mb-4" />

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
        <div className="text-center py-20">
          <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No properties found</h3>
          <p className="text-slate-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
