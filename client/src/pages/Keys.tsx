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
import { Plus, Search, Edit2, Trash2, Eye, Key as KeyIcon, CheckCircle2 } from "lucide-react";

const keyStatusColors: Record<string, string> = {
  retrieved: "bg-amber-100 text-amber-800",
  returned: "bg-green-100 text-green-800",
};

const keyStatusLabels: Record<string, string> = {
  retrieved: "Retirada",
  returned: "Devolvida",
};

const mockKeys = [
  {
    id: 1,
    keyCode: "CH-001",
    clientName: "João Silva",
    clientPhone: "(31) 99999-1111",
    personType: "cliente",
    reason: "Visita ao imóvel",
    retrievalDate: "2026-06-10",
    status: "retrieved",
    returnPolicy: "retorna",
    acceptedTerms: true,
    acceptedAt: "2026-06-10 10:30",
  },
  {
    id: 2,
    keyCode: "CH-002",
    clientName: "Ana Oliveira",
    clientPhone: "(31) 99999-2222",
    personType: "prestador",
    reason: "Manutenção",
    retrievalDate: "2026-06-09",
    returnDate: "2026-06-10",
    status: "returned",
    returnPolicy: "retorna",
    acceptedTerms: true,
    acceptedAt: "2026-06-09 14:15",
  },
  {
    id: 3,
    keyCode: "CH-003",
    clientName: "Pedro Costa",
    clientPhone: "(31) 99999-3333",
    personType: "vistoriador",
    reason: "Vistoria",
    retrievalDate: "2026-06-08",
    status: "retrieved",
    returnPolicy: "retorna",
    acceptedTerms: true,
    acceptedAt: "2026-06-08 09:00",
  },
  {
    id: 4,
    keyCode: "CH-004",
    clientName: "Maria Santos",
    clientPhone: "(31) 99999-4444",
    personType: "cliente",
    reason: "Entrega de imóvel",
    retrievalDate: "2026-06-07",
    returnDate: "2026-06-07",
    status: "returned",
    returnPolicy: "fica",
    acceptedTerms: true,
    acceptedAt: "2026-06-07 16:45",
  },
  {
    id: 5,
    keyCode: "CH-005",
    clientName: "Carlos Mendes",
    clientPhone: "(31) 99999-5555",
    personType: "proprietario",
    reason: "Inspeção",
    retrievalDate: "2026-06-06",
    status: "retrieved",
    returnPolicy: "retorna",
    acceptedTerms: false,
    acceptedAt: null,
  },
];

export default function Keys() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);

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

  const filteredKeys = mockKeys.filter((key) => {
    const matchesSearch =
      key.keyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.clientPhone.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || key.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gerenciamento de Chaves</h1>
            <p className="text-slate-600 mt-1">Total de {mockKeys.length} chaves cadastradas</p>
          </div>
          {user?.role === "gestor" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Registrar Chave
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Registrar Nova Chave</DialogTitle>
                  <DialogDescription>Preencha os dados de retirada da chave</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="keyCode">Código da Chave</Label>
                      <Input id="keyCode" placeholder="CH-006" />
                    </div>
                    <div>
                      <Label htmlFor="personType">Tipo de Pessoa</Label>
                      <Select>
                        <SelectTrigger id="personType">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cliente">Cliente</SelectItem>
                          <SelectItem value="prestador">Prestador</SelectItem>
                          <SelectItem value="proprietario">Proprietário</SelectItem>
                          <SelectItem value="vistoriador">Vistoriador</SelectItem>
                          <SelectItem value="corretor">Corretor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Nome de Quem Retira</Label>
                      <Input id="clientName" placeholder="Nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Telefone/WhatsApp</Label>
                      <Input id="clientPhone" placeholder="(31) 99999-9999" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reason">Motivo</Label>
                    <Select>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visita">Visita</SelectItem>
                        <SelectItem value="vistoria">Vistoria</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="entrega">Entrega</SelectItem>
                        <SelectItem value="inspecao">Inspeção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="returnPolicy">Política de Devolução</Label>
                      <Select>
                        <SelectTrigger id="returnPolicy">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retorna">Retorna</SelectItem>
                          <SelectItem value="fica">Fica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="responsibleStaff">Responsável</Label>
                      <Select>
                        <SelectTrigger id="responsibleStaff">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mariana">Mariana Souza</SelectItem>
                          <SelectItem value="roberto">Roberto Alves</SelectItem>
                          <SelectItem value="juliana">Juliana Costa</SelectItem>
                          <SelectItem value="vitor">Vitor Pereira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-6">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Registrar Chave</Button>
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
                    placeholder="Buscar por código, cliente ou telefone..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="retrieved">Retiradas</SelectItem>
                  <SelectItem value="returned">Devolvidas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyIcon className="w-5 h-5" />
              Chaves Cadastradas
            </CardTitle>
            <CardDescription>Histórico completo de movimentações de chaves</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Termos</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeys.map((key) => (
                    <TableRow key={key.id} className="border-slate-200 hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">{key.keyCode}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-900">{key.clientName}</p>
                          <p className="text-xs text-slate-600">{key.clientPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {key.personType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{key.reason}</TableCell>
                      <TableCell className="text-sm text-slate-600">{key.retrievalDate}</TableCell>
                      <TableCell>
                        <Badge className={keyStatusColors[key.status]}>
                          {keyStatusLabels[key.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {key.acceptedTerms ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs">Assinado</span>
                          </div>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!key.acceptedTerms && (
                            <Dialog open={isSignDialogOpen} onOpenChange={setIsSignDialogOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="gap-1 text-xs">
                                  Assinar
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Assinatura de Termo de Chave</DialogTitle>
                                  <DialogDescription>Confirme a assinatura do termo</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="bg-slate-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                                    <p className="text-sm text-slate-700">
                                      <strong>TERMO DE RESPONSABILIDADE</strong>
                                      <br />
                                      <br />
                                      Eu, {key.clientName}, declaro ter recebido a chave código {key.keyCode} em {key.retrievalDate}, para {key.reason.toLowerCase()}.
                                      <br />
                                      <br />
                                      Comprometo-me a devolver a chave em perfeito estado dentro do prazo estabelecido e a utilizá-la apenas para o fim especificado.
                                      <br />
                                      <br />
                                      Fico ciente de que qualquer dano ou perda será de minha responsabilidade.
                                    </p>
                                  </div>
                                  <div className="flex gap-2 justify-end">
                                    <Button variant="outline" onClick={() => setIsSignDialogOpen(false)}>
                                      Cancelar
                                    </Button>
                                    <Button className="gap-1">
                                      <CheckCircle2 className="w-4 h-4" />
                                      Confirmar Assinatura
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
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
