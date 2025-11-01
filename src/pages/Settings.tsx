import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { User, DollarSign, Palette, Database, Shield, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    fullName: 'John Doe',
    currency: 'USD',
    theme: 'dark',
    autoBackup: true,
    notifications: true,
    twoFactor: false,
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    setShowResetModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
            <User size={20} className="text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#EAEAEA]">Profile Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={settings.fullName}
              onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value="john.doe@example.com"
              disabled
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/20 to-green-400/10 flex items-center justify-center">
            <DollarSign size={20} className="text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#EAEAEA]">Currency & Format</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50 transition-colors"
            >
              <option value="USD" className="bg-[#0B0B0C]">USD - US Dollar</option>
              <option value="EUR" className="bg-[#0B0B0C]">EUR - Euro</option>
              <option value="GBP" className="bg-[#0B0B0C]">GBP - British Pound</option>
              <option value="INR" className="bg-[#0B0B0C]">INR - Indian Rupee</option>
              <option value="JPY" className="bg-[#0B0B0C]">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-400/10 flex items-center justify-center">
            <Palette size={20} className="text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#EAEAEA]">Appearance</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['dark', 'light', 'system'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSettings({ ...settings, theme })}
                  className={`py-3 rounded-xl border transition-all ${
                    settings.theme === theme
                      ? 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/[0.04] border-white/10 text-gray-400 hover:bg-white/[0.08]'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-400/10 flex items-center justify-center">
            <Database size={20} className="text-orange-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#EAEAEA]">Data Management</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5">
            <div>
              <p className="text-sm font-medium text-gray-200">Auto Backup</p>
              <p className="text-xs text-gray-500 mt-1">Automatically backup your data daily</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoBackup: !settings.autoBackup })}
              className={`relative w-12 h-6 rounded-full transition-all ${
                settings.autoBackup ? 'bg-cyan-400' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoBackup ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5">
            <div>
              <p className="text-sm font-medium text-gray-200">Notifications</p>
              <p className="text-xs text-gray-500 mt-1">Receive budget alerts and insights</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`relative w-12 h-6 rounded-full transition-all ${
                settings.notifications ? 'bg-cyan-400' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="pt-4 space-y-3">
            <button className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 font-medium transition-colors">
              Import Data (CSV)
            </button>
            <button className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 font-medium transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-400/10 flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#EAEAEA]">Security</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5">
            <div>
              <p className="text-sm font-medium text-gray-200">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-1">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
              className={`relative w-12 h-6 rounded-full transition-all ${
                settings.twoFactor ? 'bg-cyan-400' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.twoFactor ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <button className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 font-medium transition-colors">
            Change Password
          </button>
        </div>
      </GlassCard>

      <GlassCard className="border-red-500/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400/20 to-red-400/10 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-medium transition-colors"
        >
          Reset All Data
        </button>
      </GlassCard>

      <div className="flex justify-end gap-3 pb-8">
        <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 font-medium transition-all border border-cyan-400/20"
        >
          Save Changes
        </button>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResetModal(false)}
          />
          <div className="relative bg-[#0B0B0C] border border-red-500/30 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-400">Confirm Reset</h3>
            </div>

            <p className="text-sm text-gray-300 mb-6">
              This action cannot be undone. All your financial data, transactions, budgets, and settings will be permanently deleted.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 font-medium transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl px-6 py-4 shadow-lg backdrop-blur-xl">
            <p className="text-green-400 font-medium">Settings saved successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}
