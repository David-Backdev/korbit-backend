import {describe, it, expect, beforeEach, vi} from "vitest";
import {CategoryService} from "./categoryServices";
import {CategoryRepository} from "../repositories/CategoryRepository";
import {notFoundError, conflictError} from "../../../shared/errors/AppError";


describe ("CategoryService, (Pruebas Unitarias)", () => {

    let categoryService: CategoryService;
    let mockCategoryRepository: any;

    beforeEach(()=>{

        mockCategoryRepository = {
            createCategory: vi.fn(),
            findAllCategories: vi.fn(),
            findCategoryById: vi.fn(),
            findByName: vi.fn(),
            updateCategory: vi.fn(),
            countProductsByCategoryId: vi.fn(),
            deleteCategory: vi.fn(),
        };

         categoryService = new CategoryService(mockCategoryRepository as unknown as CategoryRepository);

    });

    //Prueba unitaria para createCategory
    describe("createCategory", ()=>{
        it ("debe crear una categría de manera exitosa cuando el nombre no existe", async()=>{

            const inputData = {nombre: "Laptops"};
            const categoriaEsperada ={
                id_categoria: 1,
                nombre: "Laptops",
            };

            mockCategoryRepository.findByName.mockResolvedValue(null);
            mockCategoryRepository.createCategory.mockResolvedValue(categoriaEsperada);

            const resultado = await categoryService.createCategory(inputData);

            expect(mockCategoryRepository.findByName).toHaveBeenCalledWith("Laptops");
            expect(mockCategoryRepository.createCategory).toHaveBeenCalledWith({nombre: "Laptops"});
            expect(resultado).toEqual(categoriaEsperada);

        });

        it("debe lanzar un conflictError si la categoría ya existe", async()=>{

            const inputData= {nombre: "Laptops"};
            const categoriaExistente = {id_categoria: 1, nombre: "Laptops"};

            mockCategoryRepository.findByName.mockResolvedValue(categoriaExistente);

            await expect (categoryService.createCategory(inputData)).rejects.toThrow(conflictError);
            await expect (categoryService.createCategory(inputData)).rejects.toThrow('Ya existe una categoría con ese nombre');

            expect(mockCategoryRepository.createCategory).not.toHaveBeenCalled();
        });
    });


});