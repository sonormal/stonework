package com.stoneworks.backend.repository;

import com.stoneworks.backend.entity.Stone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StoneRepository extends JpaRepository<Stone, Long> {

        @Transactional
        @Modifying
        @Query("INSERT INTO Stone (name, type, color, price, path) VALUES (:name, :type, :color, :price, :path)")
        void addStone(@Param("name") String name, @Param("type") String type,
                        @Param("color") String color, @Param("price") double price, @Param("path") String path);

        @Query("SELECT s FROM Stone s WHERE (:type IS NULL OR s.type = :type) AND (:color IS NULL OR s.color = :color)")
        List<Stone> getStonesByFilters(@Param("type") String type, @Param("color") String color);

        @Query("SELECT s FROM Stone s WHERE " +
                        "(:type IS NULL OR s.type = :type) AND " +
                        "(:color IS NULL OR s.color = :color) " +
                        "ORDER BY " +
                        "CASE WHEN :sort = 'asc' THEN s.price END ASC, " +
                        "CASE WHEN :sort = 'desc' THEN s.price END DESC")
        List<Stone> findByTypeAndColorAndSort(String type, String color, String sort);
}
