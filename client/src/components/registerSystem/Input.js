import React from 'react'
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export default function Input({name, handleChange, label, half, autoFocus, type, handleShowPassword,value}) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name} onChange={handleChange} variant="outlined" required fullWidth 
            label={label}
            autoFocus={autoFocus}
            type={type}
            value={value}
            InputProps = { 
                name === 'password' ? {
                    endAdornment : (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {
                                    type === 'password' ? <Visibility/> : <VisibilityOff/>
                                }
                            </IconButton>
                        </InputAdornment>
                    )
                } : null
        
                }
            />
        </Grid>
    )
}
