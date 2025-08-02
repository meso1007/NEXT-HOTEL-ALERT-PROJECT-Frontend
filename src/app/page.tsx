'use client';
import { useState, useEffect } from 'react';
import { Bell, Hotel, Mail, DollarSign, CheckCircle, AlertCircle, TrendingDown } from 'lucide-react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [hotelUrl, setHotelUrl] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [mounted, setMounted] = useState(false);

  type Alert = {
    id: number;
    hotel: string;
    currentPrice: number;
    targetPrice: number;
    status: string;
  };
  useEffect(() => {
    setMounted(true);
    const mockAlerts = [
      {
        id: 1,
        hotel: 'グランドハイアット東京',
        currentPrice: 45000,
        targetPrice: 35000,
        status: 'active'
      },
      {
        id: 2,
        hotel: 'リッツカールトン大阪',
        currentPrice: 28000,
        targetPrice: 25000,
        status: 'triggered'
      },
    ];
    setAlerts(mockAlerts);
  }, []);

  const handleSubmit = async () => {
    if (!email || !hotelUrl || !targetPrice) {
      setMessage('すべての項目を入力してください。');
      setIsSuccess(false);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setIsLoading(true);
    setMessage('アラートを登録しています...');
    setIsSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const success = Math.random() > 0.2;

      if (success) {
        setMessage('アラートが正常に登録されました！');
        setIsSuccess(true);
        setEmail('');
        setHotelUrl('');
        setTargetPrice('');

        const newAlert = {
          id: alerts.length + 1,
          hotel: 'New Hotel',
          currentPrice: parseInt(targetPrice) + Math.floor(Math.random() * 10000),
          targetPrice: parseInt(targetPrice),
          status: 'active'
        };
        setAlerts(prev => [...prev, newAlert]);
      } else {
        setMessage('アラートの登録に失敗しました。もう一度お試しください。');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('エラーが発生しました。サーバーが起動しているか確認してください。');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(15,23,42,0.1))]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30" />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                <Hotel className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hotel Price Alert
                </span>
              </h1>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                理想の価格でホテルを予約しよう
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Main Form Section */}
              <div className="lg:col-span-2">

                {/* Form Card */}
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
                  <div className="space-y-6">

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <Mail className="w-4 h-4 mr-2 text-blue-400" />
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 focus:bg-white focus:bg-opacity-10 transition-all duration-300 outline-none"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Hotel URL Input */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <Hotel className="w-4 h-4 mr-2 text-blue-400" />
                        ホテルのURL
                      </label>
                      <input
                        type="url"
                        value={hotelUrl}
                        onChange={(e) => setHotelUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 focus:bg-white focus:bg-opacity-10 transition-all duration-300 outline-none"
                        placeholder="https://booking.com/hotel/..."
                      />
                    </div>

                    {/* Target Price Input */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <DollarSign className="w-4 h-4 mr-2 text-blue-400" />
                        目標価格（円）
                      </label>
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-20 rounded-xl placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-20 focus:bg-white focus:bg-opacity-10 transition-all duration-300 outline-none"
                        placeholder="25000"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          登録中...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Bell className="w-5 h-5 mr-2" />
                          アラートを登録する
                        </div>
                      )}
                    </button>

                    {/* Message Display */}
                    {message && (
                      <div className={`p-4 rounded-xl flex items-center transition-all duration-500 ${isSuccess
                          ? 'bg-green-500 bg-opacity-20 border border-green-400 border-opacity-30 text-green-300'
                          : 'bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 text-red-300'
                        }`}>
                        {isSuccess ? (
                          <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        )}
                        <p className="text-sm font-medium">{message}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-10">
                    <div className="text-2xl font-bold text-blue-400">1,247</div>
                    <div className="text-xs text-gray-400 mt-1">アクティブアラート</div>
                  </div>
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-10">
                    <div className="text-2xl font-bold text-green-400">892</div>
                    <div className="text-xs text-gray-400 mt-1">今月の節約件数</div>
                  </div>
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-10">
                    <div className="text-2xl font-bold text-purple-400">¥180K</div>
                    <div className="text-xs text-gray-400 mt-1">総節約額</div>
                  </div>
                </div>
              </div>
              {/* Alerts Sidebar */}
              <div className="lg:col-span-1 w-full">
                <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white border-opacity-20 sticky top-4">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold flex items-center">
                        <TrendingDown className="w-5 h-5 mr-2 text-blue-400" />
                        アラート一覧
                      </h2>
                      <span className="bg-blue-600 bg-opacity-20 text-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                        {alerts.length}件
                      </span>
                    </div>

                    {/* Alert List */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {alerts.map((alert, index) => (
                        <div
                          key={alert.id}
                          className="bg-white bg-opacity-5 rounded-xl p-4 border border-white border-opacity-10 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium  text-sm truncate pr-2">
                              {alert.hotel}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${alert.status === 'active'
                                ? 'bg-blue-600 bg-opacity-20 text-gray-100'
                                : 'bg-green-500 bg-opacity-20 text-gray-100'
                              }`}>
                              {alert.status === 'active' ? '監視中' : '条件達成'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">現在価格</div>
                              <div className="text-lg font-bold ">
                                ¥{alert.currentPrice.toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-400 mb-1">目標価格</div>
                              <div className="text-sm font-semibold text-blue-500">
                                ¥{alert.targetPrice.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="bg-white bg-opacity-10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${Math.min((alert.targetPrice / alert.currentPrice) * 100, 100)}%`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Empty State */}
                    {alerts.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gray-400 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bell className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-400 text-sm">まだアラートがありません</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}