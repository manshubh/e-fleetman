import React from 'react';
import { css } from 'emotion';
import { factors, flavours } from '../constants/styleTokens';
import { lighten } from 'polished';
import { Checkbox } from './Checkbox';

const styles = getStyles();

const Table = ({ children }) => <table className={styles.table}>{children}</table>;

export default Table;

export const TableHead = ({ children }) => <thead className={styles.tableHead}>{children}</thead>;

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableData = ({ children }) => <td className={styles.tableData}>{children}</td>;

export const TableRow = ({ children }) => (
    <tr className={styles.tableRow}>
        <TableData><Checkbox /></TableData>
        {children}
    </tr>
);

export const TableHeadingData = ({ children }) => <th className={styles.tableData}>{children}</th>;

function getStyles() {
    return {
        table: css(`
            width: 100%;
            text-align: left;
            border-collapse: collapse;
        `),
        tableData: css(`
            padding: 0.8em 1.2em;
        `),
        tableRow: css(`
            cursor: pointer;
            &:hover {
                background-color: ${lighten(factors.lightenNav, flavours.default)};
            }
        `),
        tableHead: css(`
            tr {
                &:hover {
                    background-color: transparent;
                }
            }
        `)
    }
};
