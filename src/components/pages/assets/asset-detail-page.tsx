"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Building2, Bed, Bath, Maximize, DollarSign, TrendingUp, Calendar,
  Users, CheckCircle, Play, X, Calculator, Heart, Share2, Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { properties } from "@/data/mockData";
import { formatCurrency, formatPercentage, calculateDividend, calculateROI } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const property = properties.find((p) => p.id === params.id) || properties[0];
  
  const [selectedFractions, setSelectedFractions] = useState(1);
  const [investmentAmount, setInvestmentAmount] = useState(property.costPerFraction);
  const [holdingPeriod, setHoldingPeriod] = useState(3);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const fractionsRemaining = property.totalFractions - property.fractionsSold;
  const investmentValue = selectedFractions * property.costPerFraction;
  const quarterlyDividend = calculateDividend(investmentValue, property.rentalYield, "quarterly");
  const annualDividend = quarterlyDividend * 4;
  const totalROI = calculateROI(investmentValue, property.projectedROI, holdingPeriod);

  const handleFractionChange = (fractions: number) => {
    setSelectedFractions(fractions);
    setInvestmentAmount(fractions * property.costPerFraction);
  };

  const handleAmountChange = (amount: number) => {
    setInvestmentAmount(amount);
    setSelectedFractions(Math.floor(amount / property.costPerFraction));
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-500">
        <Link href="/marketplace" className="hover:text-emerald-600">Marketplace</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{property.name}</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              <img
                src={property.images[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              
              {/* Video Tour Button */}
              {property.videoUrl && (
                <Dialog open={showVideo} onOpenChange={setShowVideo}>
                  <DialogTrigger asChild>
                    <Button
                      variant="premium"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                      <p className="text-white">Video Tour Placeholder</p>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant={property.status === "open" ? "success" : "warning"} className="text-sm px-4 py-2">
                  {property.status === "open" ? "Open for Investment" : "Funding in Progress"}
                </Badge>
              </div>

              {/* Wishlist & Share */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all ${
                    activeImageIndex === index ? "ring-2 ring-emerald-500" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt={`${property.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Card>

          {/* Property Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">{property.name}</CardTitle>
                  <div className="flex items-center text-slate-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    {property.fullAddress}
                  </div>
                </div>
                <Badge variant="premium" className="text-sm px-4 py-2">
                  {formatPercentage(property.projectedROI)} Total ROI
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed mb-6">{property.description}</p>

              {/* Property Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{property.rooms}</div>
                    <div className="text-sm text-slate-500">Rooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                  <Bath className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{property.bathrooms}</div>
                    <div className="text-sm text-slate-500">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                  <Maximize className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{property.squareMeters.toLocaleString()}</div>
                    <div className="text-sm text-slate-500">Square Meters</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                  <div>
                    <div className="text-lg font-bold text-slate-900 capitalize">{property.furnishingStatus}</div>
                    <div className="text-sm text-slate-500">Furnishing</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="px-3 py-1.5">
                      <CheckCircle className="h-3 w-3 mr-1 text-emerald-600" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Construction Status */}
              {property.constructionStatus !== "completed" && (
                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-2 text-amber-800 mb-2">
                    <Info className="h-5 w-5" />
                    <span className="font-semibold">Construction Status: {property.constructionStatus}</span>
                  </div>
                  <p className="text-sm text-amber-700">Expected completion: {property.constructionTimeline}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investment Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-sm text-slate-500 mb-1">Property Value</div>
                  <div className="text-2xl font-bold text-slate-900">{formatCurrency(property.propertyValue)}</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-sm text-emerald-600 mb-1">Investment Available</div>
                  <div className="text-2xl font-bold text-emerald-700">{formatCurrency(property.investmentAvailable)}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="text-sm text-slate-500 mb-1">Cost Per Fraction</div>
                  <div className="text-2xl font-bold text-slate-900">{formatCurrency(property.costPerFraction)}</div>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Funding Progress</span>
                  <span className="font-semibold text-slate-900">{formatPercentage(property.fundingProgress)}</span>
                </div>
                <Progress value={property.fundingProgress} className="h-3" />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>{formatCurrency(property.fractionsSold * property.costPerFraction)} raised</span>
                  <span>{fractionsRemaining} fractions remaining</span>
                </div>
              </div>

              {/* Investor Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{property.fractionsSold}</div>
                  <div className="text-sm text-slate-500">Fractions Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{fractionsRemaining}</div>
                  <div className="text-sm text-slate-500">Fractions Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{property.investorsCount}</div>
                  <div className="text-sm text-slate-500">Total Investors</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Returns Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Return Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="rental">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="rental">Rental Income</TabsTrigger>
                  <TabsTrigger value="appreciation">Capital Appreciation</TabsTrigger>
                </TabsList>
                <TabsContent value="rental" className="mt-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <div className="text-sm text-emerald-600 mb-1">Rent Per Quarter</div>
                      <div className="text-2xl font-bold text-emerald-700">{formatCurrency(property.rentPerQuarter)}</div>
                      <div className="text-xs text-emerald-600 mt-1">Per fraction</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <div className="text-sm text-emerald-600 mb-1">Annual Rental Yield</div>
                      <div className="text-2xl font-bold text-emerald-700">{formatPercentage(property.rentalYield)}</div>
                      <div className="text-xs text-emerald-600 mt-1">Guaranteed income</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl">
                      <div className="text-sm text-emerald-600 mb-1">First Dividend</div>
                      <div className="text-lg font-bold text-emerald-700">{new Date(property.firstDividendDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
                      <div className="text-xs text-emerald-600 mt-1">Payment date</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="appreciation" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-50 rounded-xl">
                      <div className="text-sm text-teal-600 mb-1">Annual Appreciation</div>
                      <div className="text-2xl font-bold text-teal-700">{formatPercentage(property.capitalAppreciation)}</div>
                      <div className="text-xs text-teal-600 mt-1">Projected growth</div>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-xl">
                      <div className="text-sm text-teal-600 mb-1">Total Projected ROI</div>
                      <div className="text-2xl font-bold text-teal-700">{formatPercentage(property.projectedROI)}</div>
                      <div className="text-xs text-teal-600 mt-1">Rental + Appreciation</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <CardTitle>ROI Calculator</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Investment Amount */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Fractions</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleFractionChange(Math.max(1, selectedFractions - 1))}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={selectedFractions}
                        onChange={(e) => handleFractionChange(Number(e.target.value))}
                        className="text-center"
                        min={1}
                        max={fractionsRemaining}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleFractionChange(Math.min(fractionsRemaining, selectedFractions + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Investment Amount (₦)</Label>
                    <Input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => handleAmountChange(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Holding Period */}
                <div>
                  <Label>Holding Period (Years)</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    {[1, 3, 5, 10].map((years) => (
                      <Button
                        key={years}
                        variant={holdingPeriod === years ? "premium" : "outline"}
                        onClick={() => setHoldingPeriod(years)}
                        className="flex-1"
                      >
                        {years} {years === 1 ? "Year" : "Years"}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Returns Summary */}
                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm text-slate-500 mb-1">Quarterly Dividend</div>
                    <div className="text-2xl font-bold text-emerald-600">{formatCurrency(quarterlyDividend)}</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm text-slate-500 mb-1">Annual Dividend</div>
                    <div className="text-2xl font-bold text-emerald-600">{formatCurrency(annualDividend)}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                    <div className="text-sm text-white/80 mb-1">Total Returns ({holdingPeriod} years)</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(totalROI)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Investment CTA */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Invest in This Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Price per fraction</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(property.costPerFraction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Available fractions</span>
                  <span className="font-semibold text-emerald-600">{fractionsRemaining}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Min. investment</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(property.costPerFraction)}</span>
                </div>
              </div>

              {/* Fraction Selector */}
              <div>
                <Label>Number of Fractions</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFractionChange(Math.max(1, selectedFractions - 1))}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={selectedFractions}
                    onChange={(e) => handleFractionChange(Number(e.target.value))}
                    className="text-center font-semibold"
                    min={1}
                    max={fractionsRemaining}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFractionChange(Math.min(fractionsRemaining, selectedFractions + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Investment</span>
                  <span className="font-bold text-slate-900">{formatCurrency(investmentValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Est. Quarterly Return</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(quarterlyDividend)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Est. Annual Return</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(annualDividend)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Projected ROI</span>
                    <span className="font-bold text-emerald-600">{formatPercentage(property.projectedROI)}</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <Link href={`/checkout/${property.id}?fractions=${selectedFractions}`} className="block">
                <Button variant="premium" className="w-full h-14 text-lg">
                  Invest Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
              </Button>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Verified Property</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Legal Documentation Complete</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Secure Investment</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
