import React from 'react';
import { css } from 'emotion';

const styles = getStyles();

export const Checkbox = () => <input className={styles.default} type='checkbox' />

function getStyles() {
    return {
        default: css(`
            width: 1.5em;
            height: 1.5em;
            margin: 0;
        `)
    }
}