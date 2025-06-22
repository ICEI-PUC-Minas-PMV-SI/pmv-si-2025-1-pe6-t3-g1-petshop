import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
} from '@tamagui/lucide-icons'
import type { GroupingState } from '@tanstack/react-table'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import {
  Avatar,
  Button,
  Input,
  ScrollView,
  Button as TButton,
  Text,
  View,
  XGroup,
  XStack,
  getTokenValue,
  isWeb,
  useWindowDimensions,
} from 'tamagui'
import { CustomAlertDialog } from '../CustomAlertDialog/screen'
import { useMedia } from 'tamagui'
import { useRouter } from 'next/navigation'

import { Table } from './tableParts'

const columnHelper = createColumnHelper()

export function SortableTable() {
  const [data, setData] = React.useState([])
  const [grouping, setGrouping] = React.useState([])
  const [isOpen, setIsOpen] = React.useState(false)
  const { width: windowWidth } = useWindowDimensions()
  const router = useRouter()

  React.useEffect(() => {
    fetch('http://localhost:3001/api/pessoas', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Erro ao buscar dados:', err))
  }, [])

  const columns = [
    ...[
      'nome',
      'cpf_cnpj',
      'tipo',
      'nascimento',
      'genero',
      'telefone',
      'email',
      'endereco',
      'created_at',
      'updated_at',
    ].map((field) =>
      columnHelper.accessor(field, {
        cell: (info) => {
          const value = field.includes('at')
            ? new Date(info.getValue()).toLocaleDateString()
            : info.getValue()
          const pessoaId = info.row.original.id
          return (
            <Text
              fontSize="$4"
              color="$blue10"
              style={{ cursor: 'pointer', textDecorationLine: 'underline' }}
              onPress={() => router.push(`/pessoa?id=${pessoaId}`)}
            >
              {value}
            </Text>
          )
        },
        header: () => field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' '),
        footer: (info) => info.column.id,
      })
    ),
    columnHelper.display({
      id: 'acoes',
      header: () => 'Ações',
      cell: (info) => {
        const row = info.row.original
        const pessoaId = row.id

        const handleEdit = () => router.push(`/editPessoa?id=${pessoaId}`)

        const handleDelete = async () => {
          try {
            const res = await fetch(`http://localhost:3001/api/pessoas/${pessoaId}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            })
            res.ok
              ? alert('Pessoa deletada com sucesso!')
              : alert('Erro ao deletar pessoa.')
          } catch (error) {
            console.error(error)
            alert('Erro de rede ao tentar deletar.')
          }
        }

        return (
          <XStack gap="$2">
            <CustomAlertDialog
              open={isOpen}
              onOpenChange={setIsOpen}
              title="Deletar pessoa"
              description="Você tem certeza que deseja deletar esta pessoa?"
              cancelText="Cancelar"
              actionText="Deletar"
              onConfirm={handleDelete}
            />
            <Button size="$2" theme="active" onPress={handleEdit}>
              Editar
            </Button>
            <Button size="$2" theme="red" onPress={() => setIsOpen(true)}>
              Deletar
            </Button>
          </XStack>
        )
      },
      footer: () => null,
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    state: { grouping, pagination: { pageSize: 10, pageIndex: 0 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const headerGroups = table.getHeaderGroups()
  const tableRows = table.getRowModel().rows
  const footerGroups = table.getFooterGroups()

  const allRowsLength = tableRows.length + headerGroups.length + footerGroups.length
  const rowCounter = React.useRef(-1)
  rowCounter.current = -1

  const CELL_WIDTH = '$17'
  const TABLE_WIDTH = getTokenValue(CELL_WIDTH) * columns.length
  const { sm } = isWeb ? useMedia() : { sm: true }
  const screenWidth = windowWidth - 15

  const FooterContainer = ({ children, Footer }) =>
    isWeb ? (
      children
    ) : (
      <>
        {children}
        <Footer />
      </>
    )

  const Footer = ({ table, screenWidth, tableWidth: TABLE_WIDTH }) => (
    <View
      bottom="$3"
      flexDirection="column-reverse"
      alignItems="center"
      $gtXs={{ position: 'relative', flexDirection: 'row', maxWidth: TABLE_WIDTH }}
      px="$4"
      justifyContent="space-between"
    >
      <XGroup>
        {[
          ['First', ChevronFirst],
          ['Left', ChevronLeft],
          ['Right', ChevronRight],
          ['Last', ChevronLast],
        ].map(([label, Icon], idx) => (
          <XGroup.Item key={label}>
            <Button
              $platform-native={{ minWidth: screenWidth / 4 }}
              onPress={() =>
                [
                  () => table.setPageIndex(0),
                  () => table.previousPage(),
                  () => table.nextPage(),
                  () => table.setPageIndex(table.getPageCount() - 1),
                ][idx]()
              }
              disabled={idx < 2 ? !table.getCanPreviousPage() : !table.getCanNextPage()}
            >
              <TButton.Icon>
                <Icon />
              </TButton.Icon>
            </Button>
          </XGroup.Item>
        ))}
      </XGroup>
      <View
        flexDirection="row"
        borderRadius={999999}
        padding="$2"
        paddingHorizontal="$6"
        themeInverse
        backgroundColor="$background"
        gap="$3"
        $platform-native={{ display: 'none' }}
      >
        <Text fontWeight="$5" lineHeight="$5" fontSize="$5">
          Page
        </Text>
        <Text fontWeight="$5" lineHeight="$5" fontSize="$5">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>
      </View>
      <View $platform-native={{ display: 'none' }} flexDirection="row" gap="$4" alignItems="center">
        <Text fontSize="$5" fontWeight="$5" lineHeight="$5">
          Go to page
        </Text>
        <Input
          keyboardType="numeric"
          {...(isWeb && { type: 'number' })}
          defaultValue={String(table.getState().pagination.pageIndex + 1)}
          onChangeText={(text) => {
            const page = text ? Number(text) - 1 : 0
            table.setPageIndex(page)
          }}
          padding={0}
          ta="center"
          maxWidth={45}
          minWidth={45}
          className="border p-1 rounded"
        />
      </View>
    </View>
  )

  return (
    <FooterContainer
      Footer={() => <Footer screenWidth={screenWidth} tableWidth={TABLE_WIDTH} table={table} />}
    >
      <ScrollView horizontal maxWidth="100%">
        <View
          flex={1}
          flexDirection="column"
          gap="$6"
          minWidth={TABLE_WIDTH}
          w="100%"
          paddingHorizontal="$4"
          paddingVertical="$6"
        >
          <Table
            alignCells={{ x: 'center', y: 'center' }}
            alignHeaderCells={{ y: 'center', x: 'center' }}
            cellWidth={CELL_WIDTH}
            cellHeight="$5"
            borderWidth={0.5}
            maxWidth={TABLE_WIDTH}
            borderTopRightRadius="$4"
            borderTopLeftRadius="$4"
            borderBottomLeftRadius="$2"
            borderBottomRightRadius="$2"
            mb="$10"
            $gtXs={{ mb: 'inherit' }}
          >
            <Table.Head position="absolute" zIndex="$1" maxWidth={TABLE_WIDTH}>
              {headerGroups.map((headerGroup) => {
                rowCounter.current++
                return (
                  <Table.Row
                    backgrounded
                    backgroundColor="$color2"
                    rowLocation={
                      rowCounter.current === 0
                        ? 'first'
                        : rowCounter.current === allRowsLength - 1
                          ? 'last'
                          : 'middle'
                    }
                    key={headerGroup.id}
                    borderTopRightRadius="$4"
                    borderTopLeftRadius="$4"
                    borderBottomLeftRadius="$0"
                    borderBottomRightRadius="$0"
                  >
                    {headerGroup.headers.map((header) => (
                      <Table.HeaderCell
                        cellLocation={
                          header.id === 'avatar'
                            ? 'first'
                            : header.id === 'progress'
                              ? 'last'
                              : 'middle'
                        }
                        key={header.id}
                      >
                        <View
                          flexDirection="row"
                          cursor={header.column.getCanSort() ? 'pointer' : 'none'}
                          onPress={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                          gap="$2"
                          alignItems="center"
                        >
                          <Text fontSize="$4" selectable={false}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </Text>
                          {{
                            asc: <ChevronUp size="$1" color="$blue10" />,
                            desc: <ChevronDown size="$1" color="$blue10" />,
                            noSort: <ChevronsUpDown size="$1" color="$blue10" />,
                          }[header.column.getIsSorted() || 'noSort'] ?? null}
                        </View>
                      </Table.HeaderCell>
                    ))}
                  </Table.Row>
                )
              })}
            </Table.Head>
            <Table.Body mt="$8">
              {tableRows.map((row, index) => {
                rowCounter.current++
                return (
                  <Table.Row
                    minWidth={TABLE_WIDTH}
                    hoverStyle={{ backgroundColor: '$color2' }}
                    rowLocation={
                      rowCounter.current === 0
                        ? 'first'
                        : rowCounter.current === allRowsLength - 1
                          ? 'last'
                          : 'middle'
                    }
                    key={`${row.id}-${index}`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        cellLocation={
                          cell.column.id === 'avatar'
                            ? 'first'
                            : cell.column.id === 'progress'
                              ? 'last'
                              : 'middle'
                        }
                        key={cell.id}
                      >
                        {cell.column.id === 'avatar' ? (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        ) : (
                          <Text fontSize="$4" color="$blue10">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Text>
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          {!sm && <Footer screenWidth={screenWidth} tableWidth={TABLE_WIDTH} table={table} />}
        </View>
      </ScrollView>
    </FooterContainer>
  )
}
