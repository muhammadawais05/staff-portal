import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ memorandums: { data } }) => (
    <table data-testid='MemorandumListTable'>
      <tbody>
        <tr>
          <td>
            memorandums amount:{' '}
            {JSON.stringify(data?.nodes?.memorandums?.length)}
          </td>
        </tr>
      </tbody>
    </table>
  ))

export default MockComponent
