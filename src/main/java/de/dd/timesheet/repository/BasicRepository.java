package de.dd.timesheet.repository;

import java.util.List;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Bei dieser Klasse handelt es sich um ein Repository das Basis-Interaktionen
 * mit der Datenbank anbietet. Der Konkrete Entity-Typ wird durch die
 * abgeleitete Klasse angegeben.
 *
 * Die vorliegenden Methoden sind alle als 'protected' deklariert, damit
 * erhalten wir auf Basis des konkreten Repositories die Möglichkeit bestimmte
 * Interaktionen zu erlauben (Delegate implementieren) oder nicht.
 *
 * @param <T> Entity-Typ
 */
abstract class BasicRepository<T> {

    @PersistenceContext(name = "default")
    EntityManager entityManager;

    private final Class<T> entityKlasse;

    protected BasicRepository() {
        this.entityKlasse = null;
    }

    /**
     * Für JPA-Selektionen benötigen wir die aktuellen parametriesierten Typ.
     * Der Konsturktor sorgt dafür das zur Laufzeit dieser in der privaten
     * Variablen abgelegt wird.
     */
    protected BasicRepository(Class<T> entityKlasse) {
        this.entityKlasse = entityKlasse;
    }

    /**
     * Liefert die Entity mit der übergebenen ID.
     *
     * @param id ID
     * @return Entity
     */
    protected T findById(Integer id) {
        return this.entityManager.find(entityKlasse, id);
    }

    /**
     * Liefert eine Liste aller Entitäten auf Basis von einem Attrubut.
     *
     * @param attributename Attributsname nach dem gesucht werden soll
     * @param attributevalue Attributswert der übereinstimmen muss
     * @return Liste von überreinstimmenden Entities
     */
    protected List<T> findByAttribute(String attributename, Object attributevalue) {
        String jpql = String.format("SELECT n from %s n where n.%s=:param", entityKlasse.getSimpleName(), attributename);
        TypedQuery<T> query = this.entityManager.createQuery(jpql, entityKlasse);
        query.setParameter("param", attributevalue);

        return query.getResultList();
    }

    /**
     * Liefert die Anzahl aller in der Datenbank vorhandenen Entities des Typs.
     *
     * @return Anzahl Entities
     */
    protected Long count() {
        String jpql = String.format("SELECT count(n) from %s n", entityKlasse.getSimpleName());
        TypedQuery<Long> query = this.entityManager.createQuery(jpql, Long.class);

        return query.getSingleResult();
    }

    /**
     * Erzeugt / Speichert die übergebene Entity.
     *
     * @param entity zu speicherten Entity
     * @return gepeicherte/aktualisierte Entity
     */
    protected T merge(T entity) {
        this.entityManager.merge(entity);
        return entity;
    }

    /**
     * Löscht die Entity mit der angegebenen ID.
     *
     * @param id ID der Entity die gelöscht werden soll
     */
    protected void delete(Integer id) {
        this.entityManager.remove(this.entityManager.getReference(entityKlasse, id));
    }

    /**
     * Liefert eine Liste aller Entitäten des Typs.
     *
     * @return Liste aller Entitäten
     */
    protected List<T> getAll() {
        String jpql = String.format("SELECT n from %s n", entityKlasse.getSimpleName());
        TypedQuery<T> query = this.entityManager.createQuery(jpql, entityKlasse);

        return query.getResultList();
    }

    /**
     * Liefert eine Liste aller Entitäten des Typs.
     *
     * @return Liste aller Entitäten
     */
    protected List<T> getAll(String sortAttribut, boolean descending) {
        String jpql = String.format("SELECT n from %s n order by n.%s %s", entityKlasse.getSimpleName(), sortAttribut, descending ? "DESC" : "ASC");
        TypedQuery<T> query = this.entityManager.createQuery(jpql, entityKlasse);

        return query.getResultList();
    }

    protected List<T> getAll(String sortAttribut, boolean descending, int max, int start) {
        String jpql = String.format("SELECT n from %s n order by n.%s %s", entityKlasse.getSimpleName(), sortAttribut, descending ? "DESC" : "ASC");
        TypedQuery<T> query = this.entityManager.createQuery(jpql, entityKlasse);
        
        query.setMaxResults(max);
        query.setFirstResult(start);
        return query.getResultList();
    }

    protected EntityManager getEntityManager() {
        return entityManager;
    }
}
