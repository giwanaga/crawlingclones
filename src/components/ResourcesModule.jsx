import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectBioMass,
  selectEnergy,
  selectScrap,
} from '../store/resourcesSlice'
import styles from './ResourcesModule.module.css'

function ResourcesModule() {
  const bioMass = useSelector(selectBioMass)
  const energy = useSelector(selectEnergy)
  const scrap = useSelector(selectScrap)
  return (
    <div className={styles.resourcesModuleContainer}>
      <h3>Resources Dashboard</h3>
      <div className={styles.resoucesList}>
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
