import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Play,
  Code,
  Zap,
  Users,
  BookOpen,
  BarChart3,
  Search,
  ArrowUpDown,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TqaAlgo
            </span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Tính năng
          </Link>
          <Link href="#algorithms" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Thuật toán
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Giới thiệu
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Liên hệ
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <Badge variant="secondary" className="mb-4">
                  <Zap className="w-3 h-3 mr-1" />
                  Học thuật toán tương tác
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Trực quan hóa thuật toán
                  <br />
                  <span className="text-slate-900">Như chưa từng có</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl lg:text-2xl">
                  Thành thạo các thuật toán sắp xếp và tìm kiếm thông qua trực quan hóa tương tác. Xem thuật toán hoạt
                  động với hoạt ảnh từng bước và phân tích thời gian thực.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Bắt đầu trực quan hóa
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-50">
                  <Code className="mr-2 h-5 w-5" />
                  Xem ví dụ code
                </Button>
              </div>

              {/* Hero Visual */}
              <div className="w-full max-w-4xl mt-12">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl border p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-slate-800">Trực quan hóa Quick Sort</h3>
                      <Badge variant="outline">Demo trực tiếp</Badge>
                    </div>
                    <div className="grid grid-cols-8 gap-2 h-32">
                      {[64, 34, 25, 12, 22, 11, 90, 88].map((value, index) => (
                        <div key={index} className="flex flex-col items-center justify-end">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500"
                            style={{ height: `${(value / 90) * 100}%` }}
                          />
                          <span className="text-xs mt-1 text-slate-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Tại sao chọn TqaAlgo?
              </h2>
              <p className="text-slate-600 md:text-xl max-w-2xl mx-auto">
                Trải nghiệm học thuật toán như chưa từng có với nền tảng trực quan hóa tiên tiến
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Play className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Hoạt ảnh tương tác</CardTitle>
                  <CardDescription>
                    Xem thuật toán thực thi từng bước với hoạt ảnh mượt mà, trực quan giúp hiểu các khái niệm phức tạp
                    một cách dễ dàng.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Phân tích thời gian thực</CardTitle>
                  <CardDescription>
                    Theo dõi độ phức tạp thời gian, sử dụng bộ nhớ và các chỉ số hiệu suất trong thời gian thực khi
                    thuật toán thực thi.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Tích hợp code</CardTitle>
                  <CardDescription>
                    Xem code triển khai thực tế cùng với trực quan hóa trong nhiều ngôn ngữ lập trình khác nhau.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Dữ liệu tùy chỉnh</CardTitle>
                  <CardDescription>
                    Kiểm tra thuật toán với bộ dữ liệu của riêng bạn và xem chúng hoạt động như thế nào với các tình
                    huống đầu vào khác nhau.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Tài liệu học tập</CardTitle>
                  <CardDescription>
                    Truy cập hướng dẫn toàn diện, bài hướng dẫn và giải thích cho từng triển khai thuật toán.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Cộng đồng phát triển</CardTitle>
                  <CardDescription>
                    Tham gia cùng hàng nghìn sinh viên và nhà phát triển học thuật toán thông qua khám phá trực quan.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Algorithms Section */}
        <section id="algorithms" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Thuật toán được hỗ trợ
              </h2>
              <p className="text-slate-600 md:text-xl max-w-2xl mx-auto">
                Khám phá bộ sưu tập toàn diện các thuật toán sắp xếp và tìm kiếm
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sorting Algorithms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ArrowUpDown className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Thuật toán sắp xếp</CardTitle>
                      <CardDescription>Thành thạo nghệ thuật tổ chức dữ liệu</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Bubble Sort",
                      "Quick Sort",
                      "Merge Sort",
                      "Heap Sort",
                      "Insertion Sort",
                      "Selection Sort",
                      "Radix Sort",
                      "Counting Sort",
                    ].map((algorithm) => (
                      <Badge key={algorithm} variant="secondary" className="justify-center py-2">
                        {algorithm}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Searching Algorithms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Search className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Thuật toán tìm kiếm</CardTitle>
                      <CardDescription>Tìm dữ liệu hiệu quả và có hiệu lực</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Linear Search",
                      "Binary Search",
                      "Jump Search",
                      "Interpolation Search",
                      "Exponential Search",
                      "Fibonacci Search",
                      "Ternary Search",
                      "Hash Table Search",
                    ].map((algorithm) => (
                      <Badge key={algorithm} variant="secondary" className="justify-center py-2">
                        {algorithm}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Sẵn sàng thành thạo thuật toán?
                </h2>
                <p className="text-blue-100 md:text-xl lg:text-2xl">
                  Tham gia cùng hàng nghìn sinh viên và chuyên gia đã thay đổi hiểu biết về thuật toán thông qua trực
                  quan hóa.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="mr-2 h-5 w-5" />
                  Bắt đầu học ngay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Xem tài liệu
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">25+</div>
                <div className="text-slate-600">Thuật toán</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-600">10K+</div>
                <div className="text-slate-600">Học viên</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-600">5</div>
                <div className="text-slate-600">Ngôn ngữ</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-orange-600">100%</div>
                <div className="text-slate-600">Miễn phí</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-slate-50">
        <p className="text-xs text-slate-500">© 2025 TqaAlgo. Tất cả quyền được bảo lưu.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-slate-700">
            Điều khoản dịch vụ
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-slate-700">
            Chính sách bảo mật
          </Link>
          <Link href="https://github.com/tquocan04" className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-slate-700">
            GitHub
          </Link>
        </nav>
      </footer>
    </div>
  )
}
