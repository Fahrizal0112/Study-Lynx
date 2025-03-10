import { useCallback, useState } from '@lynx-js/react'

import './App.css'
import happyIcon1 from './assets/happy.png'
import happyIcon2 from './assets/sad.png'
import happyIcon3 from './assets/neutral.png'
import sadIcon1 from './assets/sad.png'
import sadIcon2 from './assets/neutral.png'
import sadIcon3 from './assets/happy.png'
import neutralIcon1 from './assets/neutral.png'
import neutralIcon2 from './assets/happy.png'
import neutralIcon3 from './assets/sad.png'

export function App() {
  const [currentMood, setCurrentMood] = useState('neutral')
  const [moodHistory, setMoodHistory] = useState([])
  const [iconVariants, setIconVariants] = useState({
    happy: 1,
    neutral: 1,
    sad: 1
  })

  const moodIcons = {
    happy: {
      1: happyIcon1,
      2: happyIcon2,
      3: happyIcon3
    },
    neutral: {
      1: neutralIcon1,
      2: neutralIcon2,
      3: neutralIcon3
    },
    sad: {
      1: sadIcon1,
      2: sadIcon2,
      3: sadIcon3
    }
  }

  const selectMood = useCallback((mood) => {
    if (mood !== currentMood) {
      setCurrentMood(mood)
      setMoodHistory([...moodHistory, { mood, iconVariant: iconVariants[mood] }])
    }
  }, [moodHistory, iconVariants, currentMood])

  const changeIconVariant = useCallback((e, mood) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }
    
    setIconVariants(prev => {
      const currentVariant = prev[mood]
      const nextVariant = currentVariant < 3 ? currentVariant + 1 : 1
      return { ...prev, [mood]: nextVariant }
    })
  }, [])

  const getMoodIcon = (moodData) => {
    if (typeof moodData === 'string') {
      return moodIcons[moodData][iconVariants[moodData]]
    } else {
      return moodIcons[moodData.mood][moodData.iconVariant]
    }
  }

  const getMoodText = (moodData) => {
    const mood = typeof moodData === 'string' ? moodData : moodData.mood
    switch(mood) {
      case 'happy': return 'Senang'
      case 'sad': return 'Sedih'
      default: return 'Biasa'
    }
  }

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner'>
          <text className='Title'>Mood Tracker Yuzzar Si Pundungan</text>
          <text className='Subtitle'>Bagaimana perasaan Yuzzar hari ini?</text>
        </view>
        <view className='MoodSelector'>
          <view className='MoodOption'>
            <view className='IconSelector'>
              <image 
                src={getMoodIcon('happy')} 
                className={`MoodIcon ${currentMood === 'happy' ? 'Selected' : ''}`} 
                bindtap={() => selectMood('happy')}
              />
              <view 
                className='ChangeIconButton' 
                catchTap={() => changeIconVariant(null, 'happy')}
              >
                <text>⟳</text>
              </view>
            </view>
            <text className='MoodText'>Senang</text>
          </view>
          
          <view className='MoodOption'>
            <view className='IconSelector'>
              <image 
                src={getMoodIcon('neutral')} 
                className={`MoodIcon ${currentMood === 'neutral' ? 'Selected' : ''}`} 
                bindtap={() => selectMood('neutral')}
              />
              <view 
                className='ChangeIconButton' 
                catchTap={() => changeIconVariant(null, 'neutral')}
              >
                <text>⟳</text>
              </view>
            </view>
            <text className='MoodText'>Biasa</text>
          </view>
          
          <view className='MoodOption'>
            <view className='IconSelector'>
              <image 
                src={getMoodIcon('sad')} 
                className={`MoodIcon ${currentMood === 'sad' ? 'Selected' : ''}`} 
                bindtap={() => selectMood('sad')}
              />
              <view 
                className='ChangeIconButton' 
                catchTap={() => changeIconVariant(null, 'sad')}
              >
                <text>⟳</text>
              </view>
            </view>
            <text className='MoodText'>Sedih</text>
          </view>
        </view>
        
        <view className='Content'>
          <text className='Description'>Mood Yuzzar saat ini: {getMoodText(currentMood)}</text>
          {moodHistory.length > 0 && (
            <view className='History'>
              <text className='HistoryTitle'>Riwayat Mood:</text>
              <view className='HistoryList'>
                {moodHistory.slice(-5).map((moodData, index) => (
                  <view key={index} className='HistoryItem'>
                    <image src={getMoodIcon(moodData)} className='HistoryIcon' />
                    <text className='HistoryText'>{getMoodText(moodData)}</text>
                  </view>
                ))}
              </view>
            </view>
          )}
        </view>
      </view>
    </view>
  )
}
