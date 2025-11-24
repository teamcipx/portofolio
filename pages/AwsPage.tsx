
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, Layout, Type, Palette, Lock, Save, Globe, Eye, EyeOff, ShieldAlert, CheckCircle, Navigation, Monitor, FileText, ToggleLeft, ToggleRight, Power } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const AwsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'theme' | 'layout' | 'nav' | 'seo' | 'system'>('theme');

  // Hardcoded Super Admin Password for AWS Panel
  const AWS_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === AWS_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Access Denied: Invalid Security Key");
    }
  };

  const handleColorChange = (key: 'primary' | 'accent', value: string) => {
    updateSettings({ colors: { ...settings.colors, [key]: value } });
  };

  const handleSectionToggle = (key: keyof typeof settings.sections) => {
    updateSettings({ sections: { ...settings.sections, [key]: !settings.sections[key] } });
  };

  const handleNavToggle = (key: keyof typeof settings.nav) => {
    updateSettings({ nav: { ...settings.nav, [key]: !settings.nav[key] } });
  };

  const handlePageToggle = (key: keyof typeof settings.pages) => {
    updateSettings({ pages: { ...settings.pages, [key]: !settings.pages[key] } });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <SeoHead title="AWS Login" description="Restricted Access" />
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">AWS Control Panel</h1>
          <p className="text-gray-400 mb-6 text-sm">Advanced Website Settings. Authorized Personnel Only.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Security Key" 
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-3 rounded-xl focus:ring-2 ring-brand-500 outline-none text-center tracking-widest"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-500 transition">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <SeoHead title="AWS | Site Control" description="Advanced Settings" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
           <div>
              <h1 className="text-4xl font-extrabold text-gray-900">AWS Panel</h1>
              <p className="text-gray-500">System Configuration & Layout Engine</p>
           </div>
           <div className="flex gap-3">
              <button onClick={() => window.open('/', '_blank')} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-50">View Site</button>
              <button onClick={resetSettings} className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-lg font-bold hover:bg-red-100">Reset Defaults</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm h-fit">
            <nav className="space-y-2">
              {[
                { id: 'theme', icon: Palette, label: 'Theme & Style' },
                { id: 'layout', icon: Layout, label: 'Layout & Pages' },
                { id: 'nav', icon: Navigation, label: 'Navigation' },
                { id: 'seo', icon: Globe, label: 'SEO & Meta' },
                { id: 'system', icon: ShieldAlert, label: 'System Control' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                    activeTab === item.id ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={20} /> {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Theme Settings */}
            {activeTab === 'theme' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 animate-in fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Palette/> Visual Appearance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Primary Brand Color</label>
                      <div className="flex items-center gap-4">
                         <input 
                           type="color" 
                           value={settings.colors.primary}
                           onChange={(e) => handleColorChange('primary', e.target.value)}
                           className="w-16 h-16 rounded-xl cursor-pointer border-none bg-transparent"
                         />
                         <span className="font-mono bg-gray-100 px-3 py-1 rounded text-sm">{settings.colors.primary}</span>
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Accent Color</label>
                      <div className="flex items-center gap-4">
                         <input 
                           type="color" 
                           value={settings.colors.accent}
                           onChange={(e) => handleColorChange('accent', e.target.value)}
                           className="w-16 h-16 rounded-xl cursor-pointer border-none bg-transparent"
                         />
                         <span className="font-mono bg-gray-100 px-3 py-1 rounded text-sm">{settings.colors.accent}</span>
                      </div>
                   </div>
                </div>

                <div className="mb-8">
                   <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2"><Type size={18}/> Typography (Font Family)</label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Outfit', 'Inter', 'Roboto', 'Playfair Display', 'Poppins', 'Montserrat', 'Lato', 'Open Sans'].map(font => (
                         <button
                           key={font}
                           onClick={() => updateSettings({ font: font as any })}
                           className={`p-4 rounded-xl border-2 text-center transition ${settings.font === font ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-100 hover:border-gray-200'}`}
                           style={{ fontFamily: font }}
                         >
                           <span className="text-xl font-bold">Aa</span>
                           <p className="text-xs mt-1">{font}</p>
                         </button>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Corner Radius</label>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { label: 'Square', val: '0px', class: 'rounded-none' },
                                { label: 'Small', val: '0.5rem', class: 'rounded-lg' },
                                { label: 'Modern', val: '1rem', class: 'rounded-2xl' },
                                { label: 'Pill', val: '9999px', class: 'rounded-full' },
                            ].map((r) => (
                                <button
                                key={r.label}
                                onClick={() => updateSettings({ radius: r.val as any })}
                                className={`p-2 border-2 transition flex flex-col items-center gap-1 ${settings.radius === r.val ? 'border-brand-600 bg-brand-50' : 'border-gray-100'}`}
                                >
                                    <div className={`w-6 h-6 bg-gray-200 border border-gray-400 ${r.class}`}></div>
                                    <span className="text-[10px] font-bold">{r.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-gray-700 mb-4">Theme Style</label>
                         <div className="grid grid-cols-2 gap-2">
                            {['Default', 'Minimal', 'Brutalist', 'Corporate', 'Playful'].map(style => (
                                <button 
                                    key={style}
                                    onClick={() => updateSettings({ style: style as any })}
                                    className={`p-2 text-sm font-bold rounded-lg border-2 ${settings.style === style ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-100'}`}
                                >
                                    {style}
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
              </div>
            )}

            {/* Layout Settings */}
            {activeTab === 'layout' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 animate-in fade-in">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Layout/> Layout Configuration</h2>
                 
                 <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-4">Site Width</label>
                    <div className="flex gap-4">
                        {['Standard', 'Wide', 'Boxed'].map(l => (
                            <button 
                                key={l}
                                onClick={() => updateSettings({ layout: l as any })}
                                className={`px-6 py-3 rounded-xl border-2 font-bold ${settings.layout === l ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                 </div>

                 <hr className="my-8 border-gray-100"/>
                 
                 <h3 className="font-bold text-gray-900 mb-4">Homepage Sections</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.sections).map(([key, isVisible]) => (
                       <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-700 capitalize">{key.replace('show', '')}</span>
                          <button 
                             onClick={() => handleSectionToggle(key as any)}
                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isVisible ? 'bg-green-500' : 'bg-gray-300'}`}
                          >
                             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isVisible ? 'translate-x-6' : 'translate-x-1'}`}/>
                          </button>
                       </div>
                    ))}
                 </div>

                 <hr className="my-8 border-gray-100"/>

                 <h3 className="font-bold text-gray-900 mb-4">Page Visibility (Public)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.pages || {}).map(([key, isVisible]) => (
                       <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="font-bold text-gray-700 capitalize">{key.replace('Enabled', '')} Page</span>
                          <button 
                             onClick={() => handlePageToggle(key as any)}
                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isVisible ? 'bg-blue-500' : 'bg-gray-300'}`}
                          >
                             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isVisible ? 'translate-x-6' : 'translate-x-1'}`}/>
                          </button>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* Navigation Settings */}
            {activeTab === 'nav' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 animate-in fade-in">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Navigation/> Navigation Menu</h2>
                 <p className="text-gray-500 mb-8">Show or hide specific links in the main navigation bar.</p>

                 <div className="space-y-4">
                    {Object.entries(settings.nav || {}).map(([key, isVisible]) => (
                       <div key={key} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                          <span className="font-bold text-gray-900 capitalize">{key.replace('show', '')} Link</span>
                          <button 
                             onClick={() => handleNavToggle(key as any)}
                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isVisible ? 'bg-brand-600' : 'bg-gray-300'}`}
                          >
                             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isVisible ? 'translate-x-6' : 'translate-x-1'}`}/>
                          </button>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 animate-in fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Globe/> SEO Control</h2>
                  
                  <div className="space-y-6">
                     <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-yellow-800 flex items-center gap-2"><Lock size={18}/> Maintenance Mode</h4>
                           <button 
                             onClick={() => updateSettings({ seo: { ...settings.seo, maintenanceMode: !settings.seo.maintenanceMode } })}
                             className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${settings.seo.maintenanceMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                           >
                              {settings.seo.maintenanceMode ? 'Active' : 'Disabled'}
                           </button>
                        </div>
                        <p className="text-sm text-yellow-700">If active, visitors will see a "Under Maintenance" page. Admins can bypass via ?access=admin123.</p>
                     </div>

                     <div className="p-6 border border-blue-200 bg-blue-50 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-blue-800 flex items-center gap-2"><EyeOff size={18}/> Discourage Search Engines</h4>
                           <button 
                             onClick={() => updateSettings({ seo: { ...settings.seo, preventIndexing: !settings.seo.preventIndexing } })}
                             className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${settings.seo.preventIndexing ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                           >
                              {settings.seo.preventIndexing ? 'Active (NoIndex)' : 'Disabled'}
                           </button>
                        </div>
                        <p className="text-sm text-blue-700">If active, adds &lt;meta name="robots" content="noindex"&gt; to prevent Google from ranking the site.</p>
                     </div>
                  </div>
               </div>
            )}
            
            {/* System Info */}
            {activeTab === 'system' && (
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 animate-in fade-in text-center">
                  <ShieldAlert size={64} className="mx-auto text-brand-600 mb-4"/>
                  <h2 className="text-2xl font-bold text-gray-900">System Status</h2>
                  <p className="text-gray-500 mb-8">Site Controller V2.1</p>
                  
                  <div className="p-6 bg-red-50 border border-red-100 rounded-2xl mb-8">
                     <div className="flex justify-between items-center">
                        <div className="text-left">
                           <h4 className="font-bold text-red-900 flex items-center gap-2"><Power size={18}/> Disable Admin Panel</h4>
                           <p className="text-xs text-red-700">Completely lock access to /admin for everyone.</p>
                        </div>
                        <button 
                           onClick={() => updateSettings({ system: { ...settings.system, adminEnabled: !settings.system?.adminEnabled } })}
                           className={`px-4 py-2 rounded-lg font-bold text-sm ${settings.system?.adminEnabled ? 'bg-white text-red-600 border border-red-200' : 'bg-red-600 text-white'}`}
                        >
                           {settings.system?.adminEnabled ? 'Lock Admin' : 'Unlock Admin'}
                        </button>
                     </div>
                  </div>
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AwsPage;
