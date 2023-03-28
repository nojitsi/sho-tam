import { LocationsTreeData } from '~/loaders/locations'

import { Treeselect } from 'treeselectjs'
import { useEffect } from 'react'

import locationSelectStyles from '~/styles/location-select.css'
import React from 'react'
import { FormMocks } from '~/loaders/mocks'

const LOCATION_SELECT_CONTAINER_ID = 'locationSelectContainerId'
const LOCATION_PATH_INPUT_ID = 'locationPathInputId'
const LOCATION_INPUT_ID = 'locationInputId'

export const locationSelectLinks = () => [
  { rel: 'stylesheet', href: locationSelectStyles },
]

type LocationSelectProps = {
  locationTreeData: LocationsTreeData
  mocks?: FormMocks
}

type LocationSelectState = {
  selectedLocationId: number | undefined
}

export class LocationSelect extends React.Component<
  LocationSelectProps,
  LocationSelectState
> {
  constructor(props: LocationSelectProps) {
    super(props)
    this.state = {
      selectedLocationId: this.props.mocks?.locationId,
    }
  }

  componentDidMount() {
    const locationSelectContainer = document.getElementById(
      LOCATION_SELECT_CONTAINER_ID,
    ) as HTMLElement

    if (!locationSelectContainer)
      throw Error('Location select container not found')

    const locationHashMap = this.props.locationTreeData.locationHashMap
    const setSelectedLocationId = (locationId: number | undefined) => {
      this.setState({
        selectedLocationId: locationId,
      })
    }

    this.treeSelect = new Treeselect({
      parentHtmlContainer: locationSelectContainer,
      options: this.props.locationTreeData.locationTree,
      placeholder: 'Оберіть місце',
      emptyText: 'Місце не знайдено',
      isSingleSelect: true,
      showTags: false,
      value: this.state.selectedLocationId,

      inputCallback(value) {
        const locationIdInput = document.getElementById(
          LOCATION_INPUT_ID,
        ) as HTMLInputElement
        const locationPathInput = document.getElementById(
          LOCATION_PATH_INPUT_ID,
        ) as HTMLInputElement

        if (!value) {
          locationIdInput.value = ''
          locationPathInput.value = ''

          setSelectedLocationId(undefined)
          return
        }

        const locationId = parseInt(value.toString())
        const location = value ? locationHashMap[locationId] : undefined

        locationIdInput.value = `${location?.id ?? ''}`
        locationPathInput.value = location?.path ?? ''

        setSelectedLocationId(locationId)
      },
    })
  }

  componentWillUnmount(): void {
    this.treeSelect?.destroy()
  }

  render() {
    return (
      <div>
        <input
          name="locationId"
          id={LOCATION_INPUT_ID}
          value={this.props.mocks?.locationId ?? ''}
          onChange={() => {}}
          hidden
        />
        <input
          name="locationPath"
          id={LOCATION_PATH_INPUT_ID}
          value={this.props.mocks?.locationPath ?? ''}
          onChange={() => {}}
          hidden
        />
        <div id={LOCATION_SELECT_CONTAINER_ID}></div>
      </div>
    )
  }

  private treeSelect?: Treeselect
}
