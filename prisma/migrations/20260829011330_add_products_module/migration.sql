-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "marca" (
    "id_marca" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id_marca")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "nit" VARCHAR(50) NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "producto" (
    "id_producto" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "sku" VARCHAR(50) NOT NULL,
    "codigo_barras" VARCHAR(100),
    "precio_compra" DECIMAL(12,2) NOT NULL,
    "precio_venta" DECIMAL(12,2) NOT NULL,
    "stock_inicial" INTEGER NOT NULL,
    "stock_disponible" INTEGER NOT NULL DEFAULT 0,
    "stock_minimo" INTEGER NOT NULL DEFAULT 0,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMPTZ NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_marca" INTEGER NOT NULL,
    "id_proveedor" INTEGER,
    "id_usuario_registro" INTEGER NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id_producto")
);

--AlterTable
ALTER TABLE "producto" 
ADD CONSTRAINT "precio_compra_check" CHECK ("precio_compra" > 0),
ADD CONSTRAINT "precio_venta_check" CHECK ("precio_venta" > 0),
ADD CONSTRAINT "stock_inicial_check" CHECK ("stock_inicial" >= 0),
ADD CONSTRAINT "stock_disponible_check" CHECK ("stock_disponible" >= 0),
ADD CONSTRAINT "stock_minimo_check" CHECK ("stock_minimo" >= 0);

-- CreateTable
CREATE TABLE "alerta_stock" (
    "id_alerta" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "stock_registrado" INTEGER NOT NULL,
    "fecha_generacion" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_alerta" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "alerta_stock_pkey" PRIMARY KEY ("id_alerta")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nombre_key" ON "categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "marca_nombre_key" ON "marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_nit_key" ON "proveedor"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "producto_sku_key" ON "producto"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "producto_codigo_barras_key" ON "producto"("codigo_barras");

-- CreateIndex
CREATE UNIQUE INDEX "uc_producto_nombre_marca" ON "producto"("nombre", "id_marca");

-- CreateIndex
CREATE UNIQUE INDEX "alerta_stock_id_producto_key" ON "alerta_stock"("id_producto");

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "marca"("id_marca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_usuario_registro_fkey" FOREIGN KEY ("id_usuario_registro") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerta_stock" ADD CONSTRAINT "alerta_stock_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
