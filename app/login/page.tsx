"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-jd-cream/30">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-jd-black/10 bg-white p-8 shadow-soft">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-jd-black/50">
              Ricardo Venturino S.A.
            </p>
            <h1 className="mt-1 text-xl font-semibold text-jd-black">Radar de Mercado</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="user" className="text-xs font-semibold text-jd-black/70">
                Usuario
              </label>
              <Input
                id="user"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Usuario"
                autoComplete="username"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-jd-black/70">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading || !user || !password}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
