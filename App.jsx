import React, { useState } from 'react';
import { Phone, FileText, Plus, ChevronDown } from 'lucide-react';

export default function AdvisorDashboard() {
  const [expandedAction, setExpandedAction] = useState(0);
  const [activeTab, setActiveTab] = useState('queue');
  const [notes, setNotes] = useState({
    1: [
      { id: 1, date: '3/27/25', type: 'call', content: 'Called Mike. Response time issue flagged. He committed to 1-hour callback protocol starting Friday.' },
      { id: 2, date: '3/24/25', type: 'email', content: 'Sent response time best practices with scripts and templates.' }
    ],
    2: [
      { id: 1, date: '3/26/25', type: 'call', content: 'Traffic drop discussed. SEO team optimizing landing pages. Expected improvement by mid-April.' }
    ],
    3: []
  });
  const [newNote, setNewNote] = useState({});

  const franchisees = [
    { id: 1, name: 'Orange County, CA', health: 62, leads: 36, qualityLeads: 18, responseTime: '6.2h', closeRate: '16%' },
    { id: 2, name: 'San Diego, CA', health: 74, leads: 42, qualityLeads: 30, responseTime: '3.1h', closeRate: '22%' },
    { id: 3, name: 'Portland, OR', health: 45, leads: 24, qualityLeads: 15, responseTime: '5.8h', closeRate: '18%' }
  ];

  const actions = [
    {
      id: 1,
      priority: 'urgent',
      franchisee: 'Orange County, CA',
      franchiseeId: 1,
      issue: 'Response Time Too Slow',
      impact: '+$6K/month',
      description: '6.2h avg vs 2h benchmark. Losing 45% conversion opportunity.',
      callScript: [
        '"Hey Mike, your response time is 6.2 hours. Top performers are at 1-2 hours. That gap costs you 45% in conversions."',
        '"Each converted lead = $8-12K annually. You\'re leaving significant money on the table."',
        '"What\'s blocking you from responding within 2 hours? Let\'s solve it."',
        '"Simple fix: Set phone alert for new leads. Block 15 minutes to call back."',
        '"Can you commit this week? Let\'s check in Friday morning."'
      ],
      nextSteps: 'Follow up Friday 3/29 at 8 AM. Verify new response times.',
      status: 'in_progress'
    },
    {
      id: 2,
      priority: 'urgent',
      franchisee: 'Portland, OR',
      franchiseeId: 3,
      issue: 'Traffic Drop 15%',
      impact: '-50 leads/mo',
      description: 'Organic traffic dropped 2,480 → 2,100. Likely SEO ranking loss.',
      callScript: [
        '"Sarah, your organic traffic dropped 15% last month. That\'s 380 fewer monthly visits."',
        '"This typically means SEO ranking shifts. Have you noticed competitor activity?"',
        '"Our marketing team is rebuilding your landing pages and backlink profile."',
        '"You should see recovery by April 15. Focus on converting existing leads at high rates."',
        '"I\'m checking back April 15th. Track lead quality closely meanwhile."'
      ],
      nextSteps: 'Marketing team confirmed ETA 4/15. Recheck visibility metrics. Brief franchisee weekly.',
      status: 'in_progress'
    },
    {
      id: 3,
      priority: 'medium',
      franchisee: 'San Diego, CA',
      franchiseeId: 2,
      issue: 'Close Rate Below Benchmark',
      impact: '+$8K/month',
      description: '14% vs 28% benchmark. High quality leads, weak sales execution.',
      callScript: [
        '"Dave, 42 qualified leads this month is great. But your close rate is 14% vs 28% benchmark."',
        '"That gap = $8K/month left on table. Walk me through: How quickly do you call? What\'s your pitch?"',
        '"What objections come up most? Let\'s script out your response to the top 3."',
        '"Can we do a mock call so I can hear your approach and coach you?"',
        '"I\'ll send our top performer\'s call template. Use it for 2 weeks and measure impact."'
      ],
      nextSteps: 'Schedule mock call for Thursday. Provide sales script template. Follow up in 2 weeks.',
      status: 'scheduled'
    }
  ];

  const handleAddNote = (actionId) => {
    if (!newNote[actionId]?.text?.trim()) return;
    
    const note = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      type: newNote[actionId].type || 'call',
      content: newNote[actionId].text
    };
    
    setNotes(prev => ({
      ...prev,
      [actionId]: [note, ...(prev[actionId] || [])]
    }));
    
    setNewNote(prev => ({
      ...prev,
      [actionId]: { text: '', type: 'call' }
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0e1e3c' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#20376C' }}>
        <div className="max-w-5xl mx-auto px-8 py-8">
          <p style={{ color: '#78b7df' }} className="text-xs font-semibold uppercase tracking-widest mb-2">Coaching</p>
          <h1 className="text-white font-bold text-3xl mb-1">Mike Johnson</h1>
          <p className="text-white/60 text-sm">3 franchisees assigned • Active coaching on 3 priorities</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        
        {/* Tabs */}
        <div className="flex gap-12 mb-10 border-b" style={{ borderColor: '#20376C' }}>
          <button 
            onClick={() => setActiveTab('queue')} 
            className="pb-3 font-semibold text-sm transition-colors relative"
            style={{ 
              color: activeTab === 'queue' ? '#ffffff' : '#ffffff60'
            }}
          >
            Action Queue
            {activeTab === 'queue' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#84754D' }} />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('franchisees')} 
            className="pb-3 font-semibold text-sm transition-colors relative"
            style={{ 
              color: activeTab === 'franchisees' ? '#ffffff' : '#ffffff60'
            }}
          >
            Your Franchisees
            {activeTab === 'franchisees' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#84754D' }} />
            )}
          </button>
        </div>

        {/* ACTION QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            {actions.map((action, idx) => (
              <div
                key={action.id}
                className="rounded-lg border transition-all cursor-pointer overflow-hidden"
                style={{ 
                  borderColor: action.priority === 'urgent' ? '#ad262b80' : '#f9731680',
                  backgroundColor: expandedAction === idx ? '#20376C' : '#20376C'
                }}
                onClick={() => setExpandedAction(expandedAction === idx ? null : idx)}
              >
                {/* Action Header */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-base">{action.franchisee}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ 
                        backgroundColor: action.priority === 'urgent' ? '#ad262b40' : '#f9731640',
                        color: action.priority === 'urgent' ? '#ff6b6b' : '#ffb84d'
                      }}>
                        {action.priority === 'urgent' ? '⚡ URGENT' : '◆ Medium'}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-lg mb-2">{action.issue}</p>
                    <p className="text-white/60 text-sm">{action.description}</p>
                    <p style={{ color: '#84754D' }} className="text-xs font-bold mt-3">Potential: {action.impact}</p>
                  </div>
                  <ChevronDown 
                    className="w-5 h-5 text-white/40 flex-shrink-0 transition-transform" 
                    style={{ transform: expandedAction === idx ? 'rotateZ(180deg)' : 'rotateZ(0deg)' }}
                  />
                </div>

                {/* Expanded Content */}
                {expandedAction === idx && (
                  <div style={{ backgroundColor: '#0e1e3c', borderTop: '1px solid #20376C' }} className="p-6 space-y-6">
                    {/* Call Script */}
                    <div>
                      <h4 style={{ color: '#78b7df' }} className="text-xs font-semibold uppercase tracking-widest mb-4">📞 Call Script</h4>
                      <div className="space-y-3">
                        {action.callScript.map((line, i) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-white/40 text-xs font-semibold flex-shrink-0 w-4">{i + 1}</span>
                            <p className="text-white/80 text-sm leading-relaxed">{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="pt-6 border-t" style={{ borderColor: '#20376C' }}>
                      <h4 style={{ color: '#78b7df' }} className="text-xs font-semibold uppercase tracking-widest mb-3">✅ Next Steps</h4>
                      <p className="text-white/80 text-sm">{action.nextSteps}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#20376C' }}>
                        <Phone className="w-4 h-4 inline mr-2" />
                        Call Now
                      </button>
                      <button className="flex-1 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#84754D' }}>
                        ✓ Mark Done
                      </button>
                    </div>

                    {/* Notes Section */}
                    <div className="pt-6 border-t" style={{ borderColor: '#20376C' }}>
                      <h4 style={{ color: '#78b7df' }} className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Call Notes
                      </h4>

                      {/* Previous Notes */}
                      <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                        {notes[action.franchiseeId]?.map(note => (
                          <div key={note.id} className="p-3 rounded-lg" style={{ backgroundColor: '#20376C' }}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span style={{ color: '#78b7df' }} className="text-xs font-semibold">{note.date}</span>
                              <span className="text-white/40 text-xs">{note.type === 'call' ? '☎️' : '📧'}</span>
                            </div>
                            <p className="text-white/80 text-xs">{note.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Note */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <select
                            value={newNote[action.franchiseeId]?.type || 'call'}
                            onChange={(e) => setNewNote(prev => ({
                              ...prev,
                              [action.franchiseeId]: { ...prev[action.franchiseeId], type: e.target.value }
                            }))}
                            className="p-2 rounded text-xs font-medium" style={{ backgroundColor: '#20376C', color: '#78b7df', border: '1px solid #20376C' }}
                          >
                            <option value="call">Call</option>
                            <option value="email">Email</option>
                            <option value="plan">Plan</option>
                          </select>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAddNote(action.franchiseeId); }}
                            className="px-3 py-2 rounded text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#84754D' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          placeholder="Add note about call, discussion, or plans..."
                          value={newNote[action.franchiseeId]?.text || ''}
                          onChange={(e) => setNewNote(prev => ({
                            ...prev,
                            [action.franchiseeId]: { ...prev[action.franchiseeId], text: e.target.value }
                          }))}
                          className="w-full p-2.5 rounded text-xs resize-none focus:outline-none focus:ring-2" style={{ backgroundColor: '#20376C', color: '#ffffff', borderColor: '#20376C', '--tw-ring-color': '#84754D' }}
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* YOUR FRANCHISEES */}
        {activeTab === 'franchisees' && (
          <div>
            <div className="space-y-4">
              {franchisees.map(loc => (
                <div key={loc.id} style={{ backgroundColor: '#20376C' }} className="rounded-lg p-6 border" style={{ borderColor: '#20376C' }}>
                  <h3 className="text-white font-bold text-base mb-1">{loc.name}</h3>
                  <p style={{ color: '#78b7df' }} className="text-xs font-semibold uppercase tracking-widest mb-4">Health: {loc.health}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                    {[
                      { label: 'Total Leads', value: loc.leads },
                      { label: 'Quality', value: loc.qualityLeads },
                      { label: 'Response Time', value: loc.responseTime },
                      { label: 'Close Rate', value: loc.closeRate }
                    ].map((stat, i) => (
                      <div key={i}>
                        <p style={{ color: '#78b7df' }} className="text-xs font-light mb-1">{stat.label}</p>
                        <p className="text-white font-bold text-lg">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t" style={{ borderColor: '#0e1e3c' }}>
                    <button className="flex-1 py-2 px-3 rounded text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0e1e3c' }}>
                      <Phone className="w-3 h-3 inline mr-1.5" />
                      Call
                    </button>
                    <button className="flex-1 py-2 px-3 rounded text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#84754D' }}>
                      <FileText className="w-3 h-3 inline mr-1.5" />
                      Notes
                    </button>
                  </div>

                  {/* Notes Preview */}
                  {notes[loc.id] && notes[loc.id].length > 0 && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: '#0e1e3c' }}>
                      <p style={{ color: '#78b7df' }} className="text-xs font-semibold mb-1.5">{notes[loc.id].length} note{notes[loc.id].length > 1 ? 's' : ''}</p>
                      <p className="text-white/70 text-xs line-clamp-2">{notes[loc.id][0].content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
