import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Trash2, Eye, FileText } from "lucide-react";

const contractStatusColors: Record<string, string> = {
  pendente_elaboracao: "bg-slate-100 text-slate-800",
  em_elaboracao: "bg-blue-100 text-blue-800",
  contrato_enviado: "bg-amber-100 text-amber-800",
  contrato_assinado: "bg-green-100 text-green-800",
  troca_titularidade_pagamento: "bg-purple-100 text-purple-800",
  concluido: "bg-emerald-100 text-emerald-800",
};

const contractStatusLabels: Record<string, string> = {
  pendente_elaboracao: "Pendente Elaboração",
  em_elaboracao: "Em Elaboração",
  contrato_enviado: "Contrato Enviado",
  contrato_assinado: "Contrato Assinado",
  troca_titularidade_pagamento: "Troca de Titularidade",
  concluido: "Concluído",
};

const mockContracts = [
  {
    id: 1,
    clientName: "João Silva",
    clientEmail: "joao@email.com",
    clientPhone: "(31) 99999-1111",
    status: "contrato_assinado",
    locacaoTipo: "residencial",
    endereco: "Rua das Flores, 123 - Belo Horizonte",
    valorAluguel: 2500,
    proprietario: "Maria Santos",
    createdAt: "2026-05-15",
  },
  {
    id: 2,
    clientName: "Ana Oliveira",
    clientEmail: "ana@email.com",
    clientPhone: "(31) 99999-2222",
    status: "contrato_enviado",
    locacaoTipo: "comercial",
    endereco: "Avenida Brasil, 456 - Savassi",
    valorAluguel: 3200,
    proprietario: "Carlos Mendes",
    createdAt: "2026-05-20",
  },
  {
    id: 3,
    clientName: "Lucas Ferreira",
    clientEmail: "lucas@email.com",
    clientPhone: "(31) 99999-3333",
    status: "em_elaboracao",
    locacaoTipo: "residencial",
    endereco: "Rua Paraíba, 789 - Funcionários",
    valorAluguel: 2800,
    proprietario: "Fernanda Costa",
    createdAt: "2026-05-25",
  },
  {
    id: 4,
    clientName: "Patricia Lima",
    clientEmail: "patricia@email.com",
    clientPhone: "(31) 99999-4444",
    status: "pendente_elaboracao",
    locacaoTipo: "residencial",
    endereco: "Avenida Getúlio Vargas, 1000 - Centro",
    valorAluguel: 3500,
    proprietario: "Roberto Alves",
    createdAt: "2026-06-01",
  },
  {
    id: 5,
    clientName: "Felipe Santos",
    clientEmail: "felipe@email.com",
    clientPhone: "(31) 99999-5555",
    status: "concluido",
    locacaoTipo: "comercial",
    endereco: "Rua Espírito Santo, 200 - Lourdes",
    valorAluguel: 4200,
    proprietario: "Juliana Costa",
    createdAt: "2026-04-10",
  },
];

export default function Contracts() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || contract.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Contratos</h1>
            <p className="text-slate-600 mt-1">Total de {mockContracts.length} contratos cadastrados</p>
          </div>
          {user?.role === "gestor" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Contrato
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Contrato</DialogTitle>
                  <DialogDescription>Preencha os dados do novo contrato</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome do Cliente</Label>
                      <Input id="clientName" placeholder="Nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email</Label>
                      <Input id="clientEmail" type="email" placeholder="email@exemplo.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientPhone">Telefone</Label>
                      <Input id="clientPhone" placeholder="(31) 99999-9999" />
                    </div>
                    <div>
                      <Label htmlFor="locacaoTipo">Tipo de Locação</Label>
                      <Select>
                        <SelectTrigger id="locacaoTipo">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residencial">Residencial</SelectItem>
                          <SelectItem value="comercial">Comercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="endereco">Endereço do Imóvel</Label>
                    <Input id="endereco" placeholder="Rua/Avenida, número - Bairro" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valorAluguel">Valor do Aluguel</Label>
                      <Input id="valorAluguel" type="number" placeholder="2500.00" />
                    </div>
                    <div>
                      <Label htmlFor="proprietario">Proprietário</Label>
                      <Input id="proprietario" placeholder="Nome do proprietário" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Criar Contrato</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por cliente, email ou endereço..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="pendente_elaboracao">Pendente Elaboração</SelectItem>
                  <SelectItem value="em_elaboracao">Em Elaboração</SelectItem>
                  <SelectItem value="contrato_enviado">Contrato Enviado</SelectItem>
                  <SelectItem value="contrato_assinado">Contrato Assinado</SelectItem>
                  <SelectItem value="troca_titularidade_pagamento">Troca de Titularidade</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Contratos Cadastrados
            </CardTitle>
            <CardDescription>Listagem completa de todos os contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id} className="border-slate-200 hover:bg-slate-50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{contract.clientName}</p>
                          <p className="text-xs text-slate-600">{contract.clientEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {contract.locacaoTipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{contract.endereco}</TableCell>
                      <TableCell className="font-medium">R$ {contract.valorAluguel.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge className={contractStatusColors[contract.status]}>
                          {contractStatusLabels[contract.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{contract.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user?.role === "gestor" && (
                            <>
                              <Button size="sm" variant="ghost" className="gap-1">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="gap-1 text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
