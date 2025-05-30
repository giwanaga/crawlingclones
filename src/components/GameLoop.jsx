import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEnergy, increaseResource } from '../store/resourcesSlice'

// デバッグ用：ゲームの速度を制御する変数
const GAME_SPEED_MULTIPLIER = 1

function GameLoop() {
  const dispatch = useDispatch() // Reduxアクションをディスパッチするためのフック
  const energy = useSelector(selectEnergy) // Energyの状態を取得

  // ゲームループのタイマーIDを保持するためのref
  // useEffectのクリーンアップ関数でclearIntervalするために必要
  const intervalRef = useRef(null)

  useEffect(() => {
    // コンポーネントがマウントされたときにゲームループを開始
    // すでにタイマーが動いている場合はクリア（ホットリロード対策など）
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      // 1秒ごとに実行されるロジック

      // Energyの増加
      if (energy.perSecond > 0) {
        const amountToAdd = energy.perSecond
        dispatch(increaseResource({ resource: 'energy', amount: amountToAdd }))
      }
    }, 1000 / GAME_SPEED_MULTIPLIER)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [dispatch, energy.perSecond])

  // このコンポーネントはUIを持たずロジックのみなので、nullを返す
  return null
}

export default GameLoop
