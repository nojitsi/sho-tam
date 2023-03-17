import React from 'react'
import { FormMocks } from '~/loaders/mocks'
import { Autocomplete, Chip, TextField } from '@mui/material'

type KitInputProps = {
  mocks?: FormMocks
}

type KitInputState = {
  kit: string[]
}

const KIT_INPUT_NAME = 'kit[]'
const KIT_INPUT_CONTAINER_ID = 'kitInputContainer'

export class KitInput extends React.Component<KitInputProps, KitInputState> {
  constructor(props: KitInputProps) {
    super(props)
    this.state = {
      kit: this.props.mocks?.kit ?? [],
    }
  }

  render() {
    return (
      <div>
        <div id={KIT_INPUT_CONTAINER_ID}>
          {this.state.kit.map((value, index) => (
            <input
              key={index}
              name={KIT_INPUT_NAME}
              value={value}
              hidden
              readOnly
            />
          ))}
        </div>
        <Autocomplete
          multiple
          options={[]}
          value={this.state.kit}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(event, values) => {
            this.setState({ kit: values })
          }}
          renderInput={params => (
            <TextField
              label="Комплект"
              {...params}
              placeholder="Вкажіть комплектацію"
            />
          )}
        />
      </div>
    )
  }
}
