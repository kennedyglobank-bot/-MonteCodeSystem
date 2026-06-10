import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Lock, LogIn } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-pulse text-slate-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">MonteCode</h1>
          <p className="text-slate-600 mt-2">Sistema de Gestão Integrado</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl">Bem-vindo</CardTitle>
            <CardDescription>
              Faça login para acessar o sistema de gestão de reservas, contratos e chaves
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Controle de Acesso</p>
                  <p className="text-xs text-slate-600">Perfis de Gestor e Usuário</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Gerenciamento Completo</p>
                  <p className="text-xs text-slate-600">Reservas, Contratos, Chaves e Agendamentos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Relatórios Avançados</p>
                  <p className="text-xs text-slate-600">Análise de dados em tempo real</p>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <a href={getLoginUrl()} className="block">
              <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <LogIn className="w-4 h-4 mr-2" />
                Fazer Login
              </Button>
            </a>

            {/* Footer Text */}
            <p className="text-xs text-center text-slate-500">
              Ao fazer login, você concorda com nossos termos de serviço
            </p>
          </CardContent>
        </Card>

        {/* Decorative Elements */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Desenvolvido com <span className="text-red-500">♥</span> para excelência operacional
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
