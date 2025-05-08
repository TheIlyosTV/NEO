"use client"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ruler, Shirt, FootprintsIcon as Shoe, BabyIcon as Child, Printer, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SizeGuidePage() {

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Size Guide</h1>
        <Button variant="ghost" size="icon" className="ml-auto print:hidden" onClick={handlePrint}>
          <Printer className="h-5 w-5" />
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            How to Use This Guide
          </CardTitle>
          <CardDescription>
            Find your perfect fit with our comprehensive size charts and measurement guides
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            To find your perfect size, take your measurements and compare them with our size charts. For the most
            accurate results, have someone else measure you, and make sure to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Stand straight with feet together</li>
            <li>Wear minimal clothing for accurate measurements</li>
            <li>Keep the measuring tape snug but not tight</li>
            <li>Measure twice to ensure accuracy</li>
          </ul>
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm font-medium">
              Note: Our size charts are guidelines. Fit may vary by style, fabric, and personal preference.
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="womens" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 print:hidden">
          <TabsTrigger value="womens" className="flex items-center gap-2">
            <Shirt className="h-4 w-4" />
            <span className="hidden sm:inline">Women&apos;s</span>
          </TabsTrigger>
          <TabsTrigger value="mens" className="flex items-center gap-2">
            <Shirt className="h-4 w-4" />
            <span className="hidden sm:inline">Men&apos;s</span>
          </TabsTrigger>
          <TabsTrigger value="kids" className="flex items-center gap-2">
            <Child className="h-4 w-4" />
            <span className="hidden sm:inline">Kids&apos;</span>
          </TabsTrigger>
          <TabsTrigger value="shoes" className="flex items-center gap-2">
            <Shoe className="h-4 w-4" />
            <span className="hidden sm:inline">Shoes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="womens" className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Women&apos;s Clothing Measurements</CardTitle>
                <CardDescription>How to measure yourself correctly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How to Measure</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Bust:</span> Measure around the fullest part of your bust,
                          keeping the tape parallel to the floor.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Waist:</span> Measure around your natural waistline, the
                          narrowest part of your waist.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Hips:</span> Measure around the fullest part of your hips, about
                          8&quot; below your waistline.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=250&width=200"
                      alt="Women's measurement guide"
                      className="h-auto max-h-[250px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Women&apos;s Tops & Dresses</CardTitle>
                <CardDescription>Size chart for tops, blouses, and dresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">US Size</th>
                        <th className="border p-2 text-left">Bust (in)</th>
                        <th className="border p-2 text-left">Bust (cm)</th>
                        <th className="border p-2 text-left">Waist (in)</th>
                        <th className="border p-2 text-left">Waist (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">XS</td>
                        <td className="border p-2">0-2</td>
                        <td className="border p-2">31-33</td>
                        <td className="border p-2">79-84</td>
                        <td className="border p-2">24-26</td>
                        <td className="border p-2">61-66</td>
                      </tr>
                      <tr>
                        <td className="border p-2">S</td>
                        <td className="border p-2">4-6</td>
                        <td className="border p-2">33-35</td>
                        <td className="border p-2">84-89</td>
                        <td className="border p-2">26-28</td>
                        <td className="border p-2">66-71</td>
                      </tr>
                      <tr>
                        <td className="border p-2">M</td>
                        <td className="border p-2">8-10</td>
                        <td className="border p-2">35-37</td>
                        <td className="border p-2">89-94</td>
                        <td className="border p-2">28-30</td>
                        <td className="border p-2">71-76</td>
                      </tr>
                      <tr>
                        <td className="border p-2">L</td>
                        <td className="border p-2">12-14</td>
                        <td className="border p-2">38-40</td>
                        <td className="border p-2">97-102</td>
                        <td className="border p-2">31-33</td>
                        <td className="border p-2">79-84</td>
                      </tr>
                      <tr>
                        <td className="border p-2">XL</td>
                        <td className="border p-2">16-18</td>
                        <td className="border p-2">41-43</td>
                        <td className="border p-2">104-109</td>
                        <td className="border p-2">34-36</td>
                        <td className="border p-2">86-91</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Women&apos;s Bottoms</CardTitle>
                <CardDescription>Size chart for pants, skirts, and shorts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">US Size</th>
                        <th className="border p-2 text-left">Waist (in)</th>
                        <th className="border p-2 text-left">Waist (cm)</th>
                        <th className="border p-2 text-left">Hips (in)</th>
                        <th className="border p-2 text-left">Hips (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">XS</td>
                        <td className="border p-2">0-2</td>
                        <td className="border p-2">24-26</td>
                        <td className="border p-2">61-66</td>
                        <td className="border p-2">34-36</td>
                        <td className="border p-2">86-91</td>
                      </tr>
                      <tr>
                        <td className="border p-2">S</td>
                        <td className="border p-2">4-6</td>
                        <td className="border p-2">26-28</td>
                        <td className="border p-2">66-71</td>
                        <td className="border p-2">36-38</td>
                        <td className="border p-2">91-97</td>
                      </tr>
                      <tr>
                        <td className="border p-2">M</td>
                        <td className="border p-2">8-10</td>
                        <td className="border p-2">28-30</td>
                        <td className="border p-2">71-76</td>
                        <td className="border p-2">38-40</td>
                        <td className="border p-2">97-102</td>
                      </tr>
                      <tr>
                        <td className="border p-2">L</td>
                        <td className="border p-2">12-14</td>
                        <td className="border p-2">31-33</td>
                        <td className="border p-2">79-84</td>
                        <td className="border p-2">41-43</td>
                        <td className="border p-2">104-109</td>
                      </tr>
                      <tr>
                        <td className="border p-2">XL</td>
                        <td className="border p-2">16-18</td>
                        <td className="border p-2">34-36</td>
                        <td className="border p-2">86-91</td>
                        <td className="border p-2">44-46</td>
                        <td className="border p-2">112-117</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="mens" className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Men&apos;s Clothing Measurements</CardTitle>
                <CardDescription>How to measure yourself correctly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How to Measure</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Chest:</span> Measure around the fullest part of your chest,
                          keeping the tape parallel to the floor.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Waist:</span> Measure around your natural waistline, at the
                          narrowest part of your waist.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Neck:</span> Measure around the base of your neck, where a
                          collar would sit.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Sleeve:</span> Measure from the center back of your neck, across
                          your shoulder, and down to your wrist.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=250&width=200"
                      alt="Men's measurement guide"
                      className="h-auto max-h-[250px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Men&apos;s Shirts</CardTitle>
                <CardDescription>Size chart for shirts, t-shirts, and polos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Neck (in)</th>
                        <th className="border p-2 text-left">Neck (cm)</th>
                        <th className="border p-2 text-left">Chest (in)</th>
                        <th className="border p-2 text-left">Chest (cm)</th>
                        <th className="border p-2 text-left">Sleeve (in)</th>
                        <th className="border p-2 text-left">Sleeve (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">S</td>
                        <td className="border p-2">14-14.5</td>
                        <td className="border p-2">35.5-37</td>
                        <td className="border p-2">35-37</td>
                        <td className="border p-2">89-94</td>
                        <td className="border p-2">32-33</td>
                        <td className="border p-2">81-84</td>
                      </tr>
                      <tr>
                        <td className="border p-2">M</td>
                        <td className="border p-2">15-15.5</td>
                        <td className="border p-2">38-39.5</td>
                        <td className="border p-2">38-40</td>
                        <td className="border p-2">97-102</td>
                        <td className="border p-2">33-34</td>
                        <td className="border p-2">84-86</td>
                      </tr>
                      <tr>
                        <td className="border p-2">L</td>
                        <td className="border p-2">16-16.5</td>
                        <td className="border p-2">40.5-42</td>
                        <td className="border p-2">41-43</td>
                        <td className="border p-2">104-109</td>
                        <td className="border p-2">34-35</td>
                        <td className="border p-2">86-89</td>
                      </tr>
                      <tr>
                        <td className="border p-2">XL</td>
                        <td className="border p-2">17-17.5</td>
                        <td className="border p-2">43-44.5</td>
                        <td className="border p-2">44-46</td>
                        <td className="border p-2">112-117</td>
                        <td className="border p-2">35-36</td>
                        <td className="border p-2">89-91</td>
                      </tr>
                      <tr>
                        <td className="border p-2">XXL</td>
                        <td className="border p-2">18-18.5</td>
                        <td className="border p-2">46-47</td>
                        <td className="border p-2">47-49</td>
                        <td className="border p-2">119-124</td>
                        <td className="border p-2">36-37</td>
                        <td className="border p-2">91-94</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Men&apos;s Pants</CardTitle>
                <CardDescription>Size chart for pants, jeans, and shorts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Waist (in)</th>
                        <th className="border p-2 text-left">Waist (cm)</th>
                        <th className="border p-2 text-left">Hip (in)</th>
                        <th className="border p-2 text-left">Hip (cm)</th>
                        <th className="border p-2 text-left">Inseam (in)</th>
                        <th className="border p-2 text-left">Inseam (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">28</td>
                        <td className="border p-2">28</td>
                        <td className="border p-2">71</td>
                        <td className="border p-2">35</td>
                        <td className="border p-2">89</td>
                        <td className="border p-2">30-32</td>
                        <td className="border p-2">76-81</td>
                      </tr>
                      <tr>
                        <td className="border p-2">30</td>
                        <td className="border p-2">30</td>
                        <td className="border p-2">76</td>
                        <td className="border p-2">37</td>
                        <td className="border p-2">94</td>
                        <td className="border p-2">30-32</td>
                        <td className="border p-2">76-81</td>
                      </tr>
                      <tr>
                        <td className="border p-2">32</td>
                        <td className="border p-2">32</td>
                        <td className="border p-2">81</td>
                        <td className="border p-2">39</td>
                        <td className="border p-2">99</td>
                        <td className="border p-2">30-34</td>
                        <td className="border p-2">76-86</td>
                      </tr>
                      <tr>
                        <td className="border p-2">34</td>
                        <td className="border p-2">34</td>
                        <td className="border p-2">86</td>
                        <td className="border p-2">41</td>
                        <td className="border p-2">104</td>
                        <td className="border p-2">30-34</td>
                        <td className="border p-2">76-86</td>
                      </tr>
                      <tr>
                        <td className="border p-2">36</td>
                        <td className="border p-2">36</td>
                        <td className="border p-2">91</td>
                        <td className="border p-2">43</td>
                        <td className="border p-2">109</td>
                        <td className="border p-2">30-34</td>
                        <td className="border p-2">76-86</td>
                      </tr>
                      <tr>
                        <td className="border p-2">38</td>
                        <td className="border p-2">38</td>
                        <td className="border p-2">97</td>
                        <td className="border p-2">45</td>
                        <td className="border p-2">114</td>
                        <td className="border p-2">30-34</td>
                        <td className="border p-2">76-86</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="kids" className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Kids&apos; Clothing Measurements</CardTitle>
                <CardDescription>How to measure your child correctly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">How to Measure</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Height:</span> Measure from the top of the head to the bottom of
                          the feet while standing straight.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Chest:</span> Measure around the fullest part of the chest,
                          keeping the tape parallel to the floor.
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ruler className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Waist:</span> Measure around the natural waistline.
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=250&width=200"
                      alt="Kids' measurement guide"
                      className="h-auto max-h-[250px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kids&apos; Clothing Sizes (Ages 2-7)</CardTitle>
                <CardDescription>Size chart for younger children</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Age</th>
                        <th className="border p-2 text-left">Height (in)</th>
                        <th className="border p-2 text-left">Height (cm)</th>
                        <th className="border p-2 text-left">Chest (in)</th>
                        <th className="border p-2 text-left">Chest (cm)</th>
                        <th className="border p-2 text-left">Waist (in)</th>
                        <th className="border p-2 text-left">Waist (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">2T</td>
                        <td className="border p-2">2</td>
                        <td className="border p-2">33-35</td>
                        <td className="border p-2">84-89</td>
                        <td className="border p-2">21</td>
                        <td className="border p-2">53</td>
                        <td className="border p-2">20</td>
                        <td className="border p-2">51</td>
                      </tr>
                      <tr>
                        <td className="border p-2">3T</td>
                        <td className="border p-2">3</td>
                        <td className="border p-2">36-38</td>
                        <td className="border p-2">91-97</td>
                        <td className="border p-2">22</td>
                        <td className="border p-2">56</td>
                        <td className="border p-2">20.5</td>
                        <td className="border p-2">52</td>
                      </tr>
                      <tr>
                        <td className="border p-2">4T</td>
                        <td className="border p-2">4</td>
                        <td className="border p-2">39-41</td>
                        <td className="border p-2">99-104</td>
                        <td className="border p-2">23</td>
                        <td className="border p-2">58</td>
                        <td className="border p-2">21</td>
                        <td className="border p-2">53</td>
                      </tr>
                      <tr>
                        <td className="border p-2">5</td>
                        <td className="border p-2">5</td>
                        <td className="border p-2">42-44</td>
                        <td className="border p-2">107-112</td>
                        <td className="border p-2">24</td>
                        <td className="border p-2">61</td>
                        <td className="border p-2">21.5</td>
                        <td className="border p-2">55</td>
                      </tr>
                      <tr>
                        <td className="border p-2">6</td>
                        <td className="border p-2">6</td>
                        <td className="border p-2">45-47</td>
                        <td className="border p-2">114-119</td>
                        <td className="border p-2">25</td>
                        <td className="border p-2">64</td>
                        <td className="border p-2">22</td>
                        <td className="border p-2">56</td>
                      </tr>
                      <tr>
                        <td className="border p-2">7</td>
                        <td className="border p-2">7</td>
                        <td className="border p-2">48-50</td>
                        <td className="border p-2">122-127</td>
                        <td className="border p-2">26</td>
                        <td className="border p-2">66</td>
                        <td className="border p-2">22.5</td>
                        <td className="border p-2">57</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kids&apos; Clothing Sizes (Ages 8-14)</CardTitle>
                <CardDescription>Size chart for older children</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Size</th>
                        <th className="border p-2 text-left">Age</th>
                        <th className="border p-2 text-left">Height (in)</th>
                        <th className="border p-2 text-left">Height (cm)</th>
                        <th className="border p-2 text-left">Chest (in)</th>
                        <th className="border p-2 text-left">Chest (cm)</th>
                        <th className="border p-2 text-left">Waist (in)</th>
                        <th className="border p-2 text-left">Waist (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">8</td>
                        <td className="border p-2">8</td>
                        <td className="border p-2">51-53</td>
                        <td className="border p-2">130-135</td>
                        <td className="border p-2">27</td>
                        <td className="border p-2">69</td>
                        <td className="border p-2">23</td>
                        <td className="border p-2">58</td>
                      </tr>
                      <tr>
                        <td className="border p-2">10</td>
                        <td className="border p-2">10</td>
                        <td className="border p-2">54-56</td>
                        <td className="border p-2">137-142</td>
                        <td className="border p-2">28</td>
                        <td className="border p-2">71</td>
                        <td className="border p-2">24</td>
                        <td className="border p-2">61</td>
                      </tr>
                      <tr>
                        <td className="border p-2">12</td>
                        <td className="border p-2">12</td>
                        <td className="border p-2">57-59</td>
                        <td className="border p-2">145-150</td>
                        <td className="border p-2">30</td>
                        <td className="border p-2">76</td>
                        <td className="border p-2">25</td>
                        <td className="border p-2">64</td>
                      </tr>
                      <tr>
                        <td className="border p-2">14</td>
                        <td className="border p-2">14</td>
                        <td className="border p-2">60-62</td>
                        <td className="border p-2">152-157</td>
                        <td className="border p-2">32</td>
                        <td className="border p-2">81</td>
                        <td className="border p-2">26</td>
                        <td className="border p-2">66</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="shoes" className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>How to Measure Shoe Size</CardTitle>
                <CardDescription>Find your perfect fit with these simple steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Measuring Instructions</h3>
                    <ol className="space-y-3 list-decimal pl-5">
                      <li>Stand on a piece of paper with your heel against a wall.</li>
                      <li>Mark the longest part of your foot (usually the big toe).</li>
                      <li>Measure the distance from the wall to the mark in centimeters.</li>
                      <li>Add 0.5-1cm for wiggle room.</li>
                      <li>Use the measurement to find your size in the charts below.</li>
                    </ol>
                    <div className="mt-4 bg-muted p-3 rounded-md">
                      <p className="text-sm">
                        <strong>Tip:</strong> Measure both feet and use the larger measurement. Feet tend to swell
                        during the day, so measure in the afternoon for the best fit.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=250&width=200"
                      alt="Shoe measurement guide"
                      className="h-auto max-h-[250px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Women&apos;s Shoe Size Conversion</CardTitle>
                <CardDescription>International size conversion chart for women&apos;s shoes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">US</th>
                        <th className="border p-2 text-left">EU</th>
                        <th className="border p-2 text-left">UK</th>
                        <th className="border p-2 text-left">Foot Length (cm)</th>
                        <th className="border p-2 text-left">Foot Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">5</td>
                        <td className="border p-2">35-36</td>
                        <td className="border p-2">3</td>
                        <td className="border p-2">22</td>
                        <td className="border p-2">8.7</td>
                      </tr>
                      <tr>
                        <td className="border p-2">6</td>
                        <td className="border p-2">36-37</td>
                        <td className="border p-2">4</td>
                        <td className="border p-2">22.9</td>
                        <td className="border p-2">9</td>
                      </tr>
                      <tr>
                        <td className="border p-2">7</td>
                        <td className="border p-2">37-38</td>
                        <td className="border p-2">5</td>
                        <td className="border p-2">23.8</td>
                        <td className="border p-2">9.4</td>
                      </tr>
                      <tr>
                        <td className="border p-2">8</td>
                        <td className="border p-2">38-39</td>
                        <td className="border p-2">6</td>
                        <td className="border p-2">24.6</td>
                        <td className="border p-2">9.7</td>
                      </tr>
                      <tr>
                        <td className="border p-2">9</td>
                        <td className="border p-2">39-40</td>
                        <td className="border p-2">7</td>
                        <td className="border p-2">25.4</td>
                        <td className="border p-2">10</td>
                      </tr>
                      <tr>
                        <td className="border p-2">10</td>
                        <td className="border p-2">40-41</td>
                        <td className="border p-2">8</td>
                        <td className="border p-2">26.2</td>
                        <td className="border p-2">10.3</td>
                      </tr>
                      <tr>
                        <td className="border p-2">11</td>
                        <td className="border p-2">41-42</td>
                        <td className="border p-2">9</td>
                        <td className="border p-2">27.1</td>
                        <td className="border p-2">10.7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Men&apos;s Shoe Size Conversion</CardTitle>
                <CardDescription>International size conversion chart for men&apos;s shoes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">US</th>
                        <th className="border p-2 text-left">EU</th>
                        <th className="border p-2 text-left">UK</th>
                        <th className="border p-2 text-left">Foot Length (cm)</th>
                        <th className="border p-2 text-left">Foot Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">7</td>
                        <td className="border p-2">40</td>
                        <td className="border p-2">6.5</td>
                        <td className="border p-2">25</td>
                        <td className="border p-2">9.8</td>
                      </tr>
                      <tr>
                        <td className="border p-2">8</td>
                        <td className="border p-2">41</td>
                        <td className="border p-2">7.5</td>
                        <td className="border p-2">25.7</td>
                        <td className="border p-2">10.1</td>
                      </tr>
                      <tr>
                        <td className="border p-2">9</td>
                        <td className="border p-2">42</td>
                        <td className="border p-2">8.5</td>
                        <td className="border p-2">26.7</td>
                        <td className="border p-2">10.5</td>
                      </tr>
                      <tr>
                        <td className="border p-2">10</td>
                        <td className="border p-2">43</td>
                        <td className="border p-2">9.5</td>
                        <td className="border p-2">27.3</td>
                        <td className="border p-2">10.8</td>
                      </tr>
                      <tr>
                        <td className="border p-2">11</td>
                        <td className="border p-2">44</td>
                        <td className="border p-2">10.5</td>
                        <td className="border p-2">28.3</td>
                        <td className="border p-2">11.1</td>
                      </tr>
                      <tr>
                        <td className="border p-2">12</td>
                        <td className="border p-2">45</td>
                        <td className="border p-2">11.5</td>
                        <td className="border p-2">29</td>
                        <td className="border p-2">11.4</td>
                      </tr>
                      <tr>
                        <td className="border p-2">13</td>
                        <td className="border p-2">46</td>
                        <td className="border p-2">12.5</td>
                        <td className="border p-2">29.7</td>
                        <td className="border p-2">11.7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Kids&apos; Shoe Size Conversion</CardTitle>
                <CardDescription>International size conversion chart for children&apos;s shoes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">US</th>
                        <th className="border p-2 text-left">EU</th>
                        <th className="border p-2 text-left">UK</th>
                        <th className="border p-2 text-left">Age (approx.)</th>
                        <th className="border p-2 text-left">Foot Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">8C</td>
                        <td className="border p-2">24</td>
                        <td className="border p-2">7</td>
                        <td className="border p-2">2-3 years</td>
                        <td className="border p-2">14.6</td>
                      </tr>
                      <tr>
                        <td className="border p-2">10C</td>
                        <td className="border p-2">27</td>
                        <td className="border p-2">9</td>
                        <td className="border p-2">3-4 years</td>
                        <td className="border p-2">16.5</td>
                      </tr>
                      <tr>
                        <td className="border p-2">12C</td>
                        <td className="border p-2">30</td>
                        <td className="border p-2">11</td>
                        <td className="border p-2">4-5 years</td>
                        <td className="border p-2">18.4</td>
                      </tr>
                      <tr>
                        <td className="border p-2">13C</td>
                        <td className="border p-2">31</td>
                        <td className="border p-2">12</td>
                        <td className="border p-2">5-6 years</td>
                        <td className="border p-2">19.1</td>
                      </tr>
                      <tr>
                        <td className="border p-2">1Y</td>
                        <td className="border p-2">32</td>
                        <td className="border p-2">13</td>
                        <td className="border p-2">6-7 years</td>
                        <td className="border p-2">19.7</td>
                      </tr>
                      <tr>
                        <td className="border p-2">2Y</td>
                        <td className="border p-2">33</td>
                        <td className="border p-2">1</td>
                        <td className="border p-2">7-8 years</td>
                        <td className="border p-2">20.3</td>
                      </tr>
                      <tr>
                        <td className="border p-2">3Y</td>
                        <td className="border p-2">34</td>
                        <td className="border p-2">2</td>
                        <td className="border p-2">8-9 years</td>
                        <td className="border p-2">21</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about sizing and fit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">How do I know if a garment fits correctly?</h3>
            <p className="text-muted-foreground">
              A well-fitting garment should feel comfortable and allow for movement. It shouldn&apos;t be too tight or too
              loose, and seams should align with your body&apos;s natural lines.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">What if I&apos;m between sizes?</h3>
            <p className="text-muted-foreground">
              If you&apos;re between sizes, we recommend sizing up for a more comfortable fit. For fitted styles, choose your
              usual size for a snug fit or size up for a more relaxed fit.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Do your clothes shrink after washing?</h3>
            <p className="text-muted-foreground">
              We pre-shrink most of our fabrics, but some natural fibers may shrink slightly. Always follow the care
              instructions on the garment label to maintain the best fit.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">How do I measure my shoe size accurately?</h3>
            <p className="text-muted-foreground">
              Measure your feet in the afternoon when they&apos;re at their largest. Stand on a piece of paper, trace your
              foot, and measure the length from heel to toe. Add 0.5-1cm for comfort.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">What if my measurements don&apos;t match a single size?</h3>
            <p className="text-muted-foreground">
              It&apos;s common to have measurements that correspond to different sizes. In this case, choose the size that
              fits the largest measurement and consider alterations if needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
