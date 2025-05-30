import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectBioMass,
  selectEnergy,
  selectScrap,
} from '../store/resourcesSlice'

function ResourcesModule() {
  const bioMass = useSelector(selectBioMass)
  const energy = useSelector(selectEnergy)
  const scrap = useSelector(selectScrap)
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: '10px',
        margin: '10px',
        overflowY: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <h3>Resources Dashboard</h3>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <p>
          Bio Mass: {bioMass.current} / {bioMass.limit}
          {bioMass.perSecond > 0 && ` (+${bioMass.perSecond}/s)`}
        </p>
        <p>
          Energy: {energy.current} / {energy.limit}
          {energy.perSecond > 0 && ` (+${energy.perSecond}/s)`}
        </p>
        <p>
          Scrap: {scrap.current} / {scrap.limit}
          {scrap.perSecond > 0 && ` (+${scrap.perSecond}/s)`}
        </p>
      </div>
    </div>
  )
}

export default ResourcesModule
